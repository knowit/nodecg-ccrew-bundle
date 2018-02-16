# nodecg-ccrew-bundle

nodecg-ccrew-bundle is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

It works with NodeCG versions which satisfy the [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range `~0.8.0 || ~0.9.0`. You will need to have an appropriate version of NodeCG installed to use it.

The graphics that this software renders can then be used as en overlay in e.g. [Open Broadcaster Software (OBS)](https://obsproject.com/).

## Install

You need to install [`nodecg`](http://nodecg.com/#install), before installing this bundle, which is easily done with [`nodecg-cli`](https://github.com/nodecg/nodecg-cli):

    # 1) install nodecg-cli for convenience:
    npm install -g bower # or: yarn global add bower
    npm install -g nodecg-cli # or: yarn global add nodecg-cli

    # 2) then install nodecg:
    git clone https://github.com/nodecg/nodecg.git
    cd nodecg
    npm install --production # or: yarn install --production
    bower install

    # 3) then install this bundle:
    nodecg install knowit/nodecg-ccrew-bundle

    # 4) finally boot up nodecg:
    nodecg start # or: node index.js

## Usage

Go to http://localhost:9090 to see the dashboard/admin interface of nodecg.

nodecg gives us a framework for rendering webpages and then controlling those webpages from a different webpage. The webpage we want to control becomes the overlay graphics in OBS (available trough the _graphics_ tab) and the controlling page is called the _dashboard_.

Both the _graphics_ and the _dashboard_ must be manually created (with html, css and javascript), while nodecg provides some infrastructure that we don't need to setup (like e.g. an automatic websocket, the dashboard interface etc.).

The graphics and the dashboard and distributed together in a single _bundle_, and this is one of those.

### Open Broadcaster Software (OBS)

The pages that are rendered under the _graphics_ tab can be used in OBS by using e.g. [browser source](https://obsproject.com/forum/resources/browser-plugin.115/) (or [obs-linuxbrowser](https://github.com/bazukas/obs-linuxbrowser)).
