import { userController } from "../../src/api/controllers/user/user.controller";

describe('userController', () => {
  let controller: userController;
  const mockService = {
    login: jest.fn().mockResolvedValue({ id: 'u1' }),
    getUser: jest.fn().mockResolvedValue({ id: 'u1', name: 'Test' }),
    addFavorite: jest.fn().mockResolvedValue(undefined),
    addChoice: jest.fn().mockResolvedValue({ choices: [] }),
    updateChoices: jest.fn().mockResolvedValue({ success: true }),
    updateSettings: jest.fn().mockResolvedValue({}),
  };

  beforeEach(() => {
    controller = new userController(mockService as any);
  });

  it('calls login and returns user', async () => {
    const payload = { username: 'alice' };
    const res = await controller.loginUser(payload as any);
    expect(mockService.login).toHaveBeenCalledWith(payload);
    expect(res).toEqual({ id: 'u1' });
  });

  it('forwards getUser request user id', async () => {
    const req = { user: { userInfo: { id: 'u1' } } } as any;
    const res = await controller.getUser(req);
    expect(mockService.getUser).toHaveBeenCalledWith('u1');
    expect(res).toEqual({ id: 'u1', name: 'Test' });
  });

  it('forwards addFavorite vkmId and user id', async () => {
    const req = { user: { userInfo: { id: 'u1' } } } as any;
    await controller.addFavorite(42 as any, req);
    expect(mockService.addFavorite).toHaveBeenCalledWith('u1', 42);
  });

  it('forwards addChoice numeric vkmId', async () => {
    const req = { user: { userInfo: { id: 'u1' } } } as any;
    await controller.addChoice(42 as any, req);
    expect(mockService.addChoice).toHaveBeenCalledWith('u1', 42);
  });

  it('forwards updateChoice choices array', async () => {
    const choices = [{ moduleId: 'm1', choice: true }];
    const req = { user: { userInfo: { id: 'u1' } } } as any;
    await controller.updateChoice(choices as any, req);
    expect(mockService.updateChoices).toHaveBeenCalledWith('u1', choices);
  });

  it('forwards updateSettings settings object', async () => {
    const settings = { theme: 'dark' } as any;
    const req = { user: { userInfo: { id: 'u1' } } } as any;
    await controller.updateSettings(settings, req);
    expect(mockService.updateSettings).toHaveBeenCalledWith('u1', settings);
  });

});
