# iO-808 (self-hostable fork)

A web-based TR-808 drum machine that runs entirely in the browser using the Web Audio API.

**Try it:** [theogal.github.io/io-808](https://theogal.github.io/io-808/)

This is a fork of [iO-808 by Vincent Riemer](https://github.com/vincentriemer/io-808), which did all the hard work of recreating the 808's sounds and interface. This fork focuses on making it easy to self-host and on a few UI tweaks.

## Changes in this fork

- **Works from any subfolder.** All asset paths are relative, so it can be served from a site root or from a path like `example.com/io808/` without rebuilding.
- **Fits the browser window.** The machine scales itself to fit the window, so no scrollbars and no need for browser zoom on smaller or OS-scaled screens.
- **Button column on the left.** Load, save and reset moved into a vertical column next to the machine, together with a help button (opens the tutorial) and a link to this repo. The machine stays centered in the window.
- **No header or footer rows.** More room for the machine itself.
- **Automatic builds.** Every push to `master` is built by GitHub Actions, published as a ready-to-serve zip and deployed to GitHub Pages.

## Self-hosting

No build step needed. Download the latest build:

[io808.zip](https://github.com/TheoGal/io-808/releases/download/latest/io808.zip)

It contains a single `io808/` folder of static files. Unzip it into any directory your web server serves, and open `/io808/` in the browser:

```
cd /path/to/your/site-root
wget https://github.com/TheoGal/io-808/releases/download/latest/io808.zip
unzip -o io808.zip
```

Any static file server works. With Caddy, for example:

```
example.com {
    root * /path/to/your/site-root
    encode zstd gzip
    file_server
}
```

Patterns and settings are saved in the browser's local storage, and can be exported and imported as `.json` files with the buttons on the left.

## Building from source

Requires Node.js (22 works) and Yarn 1.

```
yarn install --frozen-lockfile
yarn build
```

The static site is written to `out/`.

## License

MIT, see [LICENSE.md](LICENSE.md). Original work copyright (c) 2016 Vincent Riemer.
