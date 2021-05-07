import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create an user', async () => {
    const user = await createUserService.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an exists email', async () => {
    await createUserService.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    await expect(createUserService.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    })).rejects.toBeInstanceOf(AppError);
  });
});