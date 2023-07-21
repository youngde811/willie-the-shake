# Welcome to Willie The Shake #

This project generates "Shakespearean" insults to either the terminal or via the included iOS app. Many years ago, I
stumbled across the original implementation (I think); it was written in C. I took that code and wrote a screen saver
for my X Window System environment on SunOS/Solaris, using _Xlib_. The documentation for the original work gave credit
to a performer named "Lord Buckley"[^1], who had an act he called "Willie The Shake". The code author had apparently
seen this fellow a number of times; thus the name of this project.

I found myself needing a distraction after a particularly challenging project at work. Having discovered a newer
implementation of the code on _GitHub_ - Kurt Blair's "Shakespearean Insult Generator" - I forked his repository;
re-wrote the generator in Python; and decided to include an iOS app that makes use of generated insults in an
entertaining manner. The app is written in _React Native_ and _Expo_, but is currently available only via
_TestApp.io_. However, I plan to release it on the AppStore if I can suffer through the Apple approval process.

## Overview ##

The insult generator is data-driven and written in Python 3.x. There's a small model file included in the _data_
directory, containing 50 lines of three tokens each; this file may be used to create a large number of insult
phrases. The generator may be used to insult you from a terminal, or save a configurable number of insults to a
file. The latter approach is used to power the app.

Displaying an insult is simple; just run `bin/generate` from the project directory with no arguments. You'll receive a
single offensive phrase; for example: _Thou ruttish fen-sucked apple-john!_ If you need some functional information
from this script, run `bin/generate -h`.

## Usage ##

The generator offers a few command-line arguments:

| Argument | Description |
| :-: |:-: |
| _-c COUNT_ | Generate COUNT number of insults, writing them to either standard output or a file. |
| _-g PATH_ | Write some number of insults to PATH, saving them for later use. Whatever that might be. |
| _-f PATH_ | Use PATH as the insult generator's model file, rather than the default file provided. |
| _-o FORMAT_ | Output insults in FORMAT. The default is _text_ without the _-g_ flag; _json_ otherwise. |

As mentioned above, in the project's _bin_ directory there is a _Bash_ script that serves as a simple wrapper around the
Python-based generator to save a small amount of typing. If you prefer, you may use your own Python interpreter
directly: `python3 src/generator.py`. Note that Python 3 is required; the generator will **not** run on any 2.x version.

## The Model File ##

The generator uses a "model file" to drive insult assembly. Each insult is created by putting three words, or fragments,
in between the tokens "Thou " and "!". Each of the fragments may be thought of as a column; fragments are picked at
random, one from each column of words that are supplied in the data file, using a separate random number for each. The
algorithm is actually quite simple.

Using the included model file, there are 50 lines of three tokens each, allowing for 573,800 combinations: $$C(n,r) = \frac{n!}{r!(n-r)!}$$

You may use your own model file if you wish. If you create your own, it **must** follow a strict format: _three tokens
per line; each token separated by a single tab character_. The generator makes an attempt to validate a model file, and
fail cleanly if it gets angry.

## Current Work ##

There is an offical release of the project, plus a 1.0.0 version of the iOS app - _WillieShake_ - available and running,
although as mentioned only via _TestApp.io_ right now, and for iOS. The app is supplied with a JSON file containing
insults generated by _generate.py_; it presents those insults as a list (along with a few pretty buttons and such). You
may select one of the insults, and use your phone's default messaging app to insult anyone you wish.

There might be more features on the way, so stay tuned.

## License ##

This software is made available under the _MIT License_. See _LICENSE.md_ for details.

## Attributions ##

The insult generator itself is based on the work of Kurt Blair's [Shakespearean Insult Generator](https://github.com/Kurt-Blair/Shakespearean-Insult-Generator).

## Latest News ##

- _07/21/2023_: Version 1.0.0 of the app is now available on _TestApp_, and is fully functional:
  - There's a new button that opens a WebView Modal, taking you to the _Wikipedia_ page on Lord Buckeley.
  - Stability and style improvements.

- _07/17/2023_: Version 0.7.2 of the app is available on _TestApp_. Another minor release that offers just a few
  enhancements:
  - An activity indicator is shown during app loading, if your internet connection is slow.
  - There's now a config file that offers some flexible properties for the app. Later I might add a capability to
    make changes to this file.

- _07/14/2023_: Version 0.7.1 of the app is available on _TestApp_. This is a small release, and really just offers a
  few visible improvements:
  - Buttons now offer feedback animation, using the React _Pressable_ API.
  - One or two font improvements.

- _07/13/2023_: Version 0.7.0 of the app has been released onto _TestApp.io_. This release offers several enhancements:
  - Much nicer splash screen.
  - Very nice main page background image.
  - Nicer color scheme overall.
  - An AppBar button that opens your default browser and takes you directly to the GitHub project page.
  - More efficient rendering.
  - Better documentation.

## Internal Testers ##

The current app release may be found [here](https://portal.testapp.io/apps/install/eLDOGzZngbjgg).

## References ##

- [Lord Buckley's](http://www.lordbuckley.com/the-word-new/transcriptions/willie-the-shake.html) "Willie The Shake".
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/): A successful Git branching model.

## Author ##

[David E. Young](mailto://youngde811@pobox.com)

[^1]: [Lord Buckley](https://en.wikipedia.org/wiki/Lord_Buckley) was a weird dude, as were all of those fellows into the
    Beat scene.
