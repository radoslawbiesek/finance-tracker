import axios from 'axios';

describe('GET /api/health', () => {
  it('should return a 200 OK', async () => {
    const res = await axios.get(`/api/health`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual('OK');
  });
});
