const http = require('http');

const testRequest = (path, data, token = null) => {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
};

async function runTests() {
    console.log('--- Starting Validation Tests ---\n');

    // Test 1: Register with invalid data
    console.log('Test 1: Register with invalid email and short password');
    const regFail = await testRequest('/auth/register', {
        name: 'A',
        email: 'not-an-email',
        password: '123'
    });
    console.log('Status:', regFail.status);
    console.log('Response:', JSON.stringify(regFail.data, null, 2));
    console.log('--------------------------------\n');

    // Test 2: Create post with missing content
    console.log('Test 2: Create post with missing content (using dummy token)');
    const postFail = await testRequest('/posts/', { title: 'Some Title' }, 'dummy-token');
    console.log('Status:', postFail.status); // Might be 401 if token is checked first, but let's see validation
    console.log('Response:', JSON.stringify(postFail.data, null, 2));
    console.log('--------------------------------\n');

    // Test 3: Create post with optional title missing
    console.log('Test 3: Create post with title missing (should be OK if authenticated)');
    console.log('Note: This test might fail with 401/500 if the dummy-token is invalid, but we are checking validation middleware order.');
    const postSuccessValidation = await testRequest('/posts/', { content: 'This is a long enough content for the post.' }, 'dummy-token');
    console.log('Status:', postSuccessValidation.status);
    console.log('Response:', JSON.stringify(postSuccessValidation.data, null, 2));
    console.log('--------------------------------\n');
}

runTests().catch(console.error);
