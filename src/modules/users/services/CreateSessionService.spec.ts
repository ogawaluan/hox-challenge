import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionService: CreateSessionService;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a session', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    const response = await createSessionService.execute({
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with a non exist user', async () => {
    await expect(createSessionService.execute({
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    await expect(createSessionService.execute({
      email: 'Foo@Foo.com',
      password: 'FooFoo2',
    })).rejects.toBeInstanceOf(AppError);
  });
});