<p align="center">
  <a href="https://github.com/louisgv/rose/">
    <img alt="hyperproxy" src="https://github.com/louisgv/rose/blob/master/icon.png" width="234">
  </a>
</p>

<h1 align="center">
    rose
</h1>

<h2 align="center">
    A rewrite of <a href="https://github.com/RobotWebTools/roslibjs">roslibjs</a> that smells like roses.
</h2>

# Goal

To be the rewrite of roslibjs that is truly modular, tool friendly, and optionally backward compatible.

# Setup

Install global tooling dependencies:

```
npm i -g lerna yarn
```

Install dependencies (run in `/path/to/rose`)

```
yarn
lerna bootstrap
```

Run these anywhere within `path/to/rose` to start the server (i.e, you can run them from child project or path):

```
lerna run --parallel watch # or in the root of rose, do "yarn watch"
```

# Run Modes

To run the rose in local mode:

```
LOCAL=true lerna run watch --parallel
```

# Credits

Logo created using [DotGrid](https://github.com/hundredrabbits/Dotgrid) by [Devine Lu Linvega](https://twitter.com/neauoire)

# License

- GSM
- MIT

# Misc

The rose blooms overtime... It is now a `bud`.