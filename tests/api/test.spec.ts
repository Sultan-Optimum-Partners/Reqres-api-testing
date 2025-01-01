import { test, expect } from '@playwright/test';

test.describe('Testing List Users Endpoint', () => {
    const endpoint = '/api/users';

    test('GET /api/users?page=1 returns HTTP 200', async ({ request }) => {
        const response = await request.get(`${endpoint}?page=1`);
        expect(response.status()).toBe(200);
    });

    test('GET /api/users?page=1&delay=3 returns HTTP 200', async ({ request }) => {
        const response = await request.get(`${endpoint}?page=1&delay=3`);
        expect(response.status()).toBe(200);
    });

    test('GET /api/users?page=2 returns a list of valid user objects', async ({ request }) => {
        const response = await request.get(`${endpoint}?page=2`);
        const body = await response.json();
        expect(body.data).toBeInstanceOf(Array);
        body.data.forEach(validateUserObject);
    });
});

test.describe('Testing Single User Endpoint', () => {
    const endpoint = '/api/users';

    test('GET /api/users/2 returns HTTP 200', async ({ request }) => {
        const response = await request.get(`${endpoint}/2`);
        expect(response.status()).toBe(200);
    });

    test('GET /api/users/2 returns user details matching the ID', async ({ request }) => {
        const response = await request.get(`${endpoint}/2`);
        const body = await response.json();
        expect(body.data.id).toBe(2);
        validateUserObject(body.data);
    });

    test('GET /api/users/{invalid-id} returns HTTP 404 and an empty object', async ({ request }) => {
        const response = await request.get(`${endpoint}/23`);
        expect(response.status()).toBe(404);
        expect(await response.json()).toEqual({});
    });
});

test.describe('Testing Colors Endpoint', () => {
    const endpoint = '/api/unknown';

    test('GET /api/unknown returns HTTP 200 and a list of colors', async ({ request }) => {
        const response = await request.get(endpoint);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toBeInstanceOf(Array);
        body.data.forEach(validateColorObject);
    });
});

test.describe('Testing Single Color Endpoint', () => {
    const endpoint = '/api/unknown';

    test('GET /api/unknown/2 returns HTTP 200 and a valid color object', async ({ request }) => {
        const response = await request.get(`${endpoint}/2`);
        expect(response.status()).toBe(200);
        validateColorObject((await response.json()).data);
    });

    test('GET /api/unknown/{invalid-id} returns HTTP 404', async ({ request }) => {
        const response = await request.get(`${endpoint}/23`);
        expect(response.status()).toBe(404);
    });
});

test.describe('Testing Create User (POST)', () => {
    const endpoint = '/api/users';
    const validUserData = { name: 'morpheus', job: 'leader' };

    test('POST /api/users creates a new user and returns HTTP 201', async ({ request }) => {
        const response = await request.post(endpoint, { form: validUserData });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toMatchObject({
            name: validUserData.name,
            job: validUserData.job,
        });
    });
});

test.describe('Testing Update User (PUT)', () => {
    const endpoint = '/api/users/2';

    test('PUT /api/users/2 updates user details and returns HTTP 200', async ({ request }) => {
        const response = await request.put(endpoint, { form: { name: 'morpheus', job: 'leader' } });
        expect(response.status()).toBe(200);
    });
});

test.describe('Testing Partial Update User (PATCH)', () => {
    const endpoint = '/api/users/2';

    test('PATCH /api/users/2 partially updates user details and returns HTTP 200', async ({ request }) => {
        const response = await request.patch(endpoint, { form: { name: 'morpheus', job: 'leader' } });
        expect(response.status()).toBe(200);
    });
});

test.describe('Testing Delete User (DELETE)', () => {
    const endpoint = '/api/users/2';

    test('DELETE /api/users/2 deletes the user and returns HTTP 204', async ({ request }) => {
        const response = await request.delete(endpoint);
        expect(response.status()).toBe(204);
    });
});

test.describe('Testing User Registration', () => {
    const validCredentials = { email: 'eve.holt@reqres.in', password: 'pistol' };
    const invalidCredentials = { email: 'sydney@fife' };

    test('POST /api/register with valid credentials returns HTTP 200', async ({ request }) => {
        const response = await request.post('/api/register', { form: validCredentials });
        expect(response.status()).toBe(200);
    });

    test('POST /api/register with invalid credentials returns HTTP 400 and an error message', async ({ request }) => {
        const response = await request.post('/api/register', { form: invalidCredentials });
        expect(response.status()).toBe(400);
        expect(await response.json()).toHaveProperty('error');
    });
});

test.describe('Testing User Login', () => {
    const validCredentials = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
    const invalidCredentials = { email: 'peter@klaven' };

    test('POST /api/login with valid credentials returns HTTP 200 and a token', async ({ request }) => {
        const response = await request.post('/api/login', { form: validCredentials });
        expect(response.status()).toBe(200);
        expect((await response.json())).toHaveProperty('token');
    });

    test('POST /api/login with invalid credentials returns HTTP 400 and an error message', async ({ request }) => {
        const response = await request.post('/api/login', { form: invalidCredentials });
        expect(response.status()).toBe(400);
        expect(await response.json()).toHaveProperty('error');
    });
});

async function validateUserObject(user: any) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');
}

async function validateColorObject(color: any) {
    expect(color).toHaveProperty('id');
    expect(color).toHaveProperty('name');
    expect(color).toHaveProperty('year');
    expect(color).toHaveProperty('color');
    expect(color).toHaveProperty('pantone_value');
}
