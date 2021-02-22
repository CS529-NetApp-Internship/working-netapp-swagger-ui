################################################################################
# We don't run 'npm install' in build. sysmgr had problems doing this when the
# build farm ran many copies of 'npm install' in parallel. Instead, we do it
# manually whenever dependencies change and save the resulting node_module in a
# zip file.
#
# This may need to be done from RTP. Repo access is occasionally inaccessible
# from other sites. Or if it stops working in the VED entirely, it can be done
# outside the VED - only needs to be done when dependencies change though, so
# should be rare.
#
# To create node_modules.tgz:
################################################################################

. /usr/software/pkgs/nvm/nvm.sh
nvm use v10.9.0
cd <this-directory>
npm build

# That didn't do it all the way and hit a build error later because of a
# problem within node-sass. Installing node-sass all on its own fixed it.
npm build node-sass

tar -czf ../../node_modules.tgz node_modules


################################################################################
# Initial setup of this build system:
################################################################################
1. Copied sysmgr/ui/.npmrc, which points to a VED friendly npm repository
2. Copied sysmgr/Makefile.ui, and poked away at it until it was working for us
3. Removed package-lock.json, which referenced outside the VED locations. It
   was regenerated with in-VED links and is now checked in with those.
4. Removed this from package.json because it has a dependency on iltorb, which
   tries to build C++11 code. Couldn't figure out how to properly set the flags
   to get it to run with clang and C++11 flags. Didn't seem to cause any problems.
  "bundlesize": [
    {
      "path": "./dist/swagger-ui-bundle.js",
      "maxSize": "1 MB",
      "compression": "none"
    }
  ]
