<h1 align="center">Hox-challenge</h1>
<p align="center">Product and category manager, with control and authentication of users.</p>

Before you begin, you will need to have the following tools installed on your machine: <br />
Git on your machine to clone the project: [Git](https://git-scm.com)<br />
A package manager (Yarn or NPM, in my case Yarn): [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) <br />
If possible, have an editor to work with the code as [VSCode](https://code.visualstudio.com/)
<br />

## 🎲 Running the application
To start the development, it is necessary to clone the GitHub project in a directory of your choice:
```shell
cd "directory of your choice"
git clone https://github.com/ogawaluan/hox-challenge.git
```
<br />

#### Install the packages
```shell
yarn
```
<br />

#### If necessary, run the migrations
```shell
yarn typeorm migration:run
```
<br />

#### Run the project
```shell
yarn dev:server
```
will run on port 3333
<br />

#### Run the tests
```shell
yarn test
```
<br />

#### Run the docs
```shell
npx serve
```
will run on port 5000
<br />
