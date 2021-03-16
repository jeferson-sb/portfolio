---
id: 340405
title: Create a simple Note-taking app with Deno
slug: create-a-simple-note-taking-app-with-deno-3k7g
published_at: 2020-05-20T21:33:59.131Z
tags: deno,javascript,typescript,tutorial
excerpt: Write your first cli application with Deno
crosspostedOn: Dev.to
crosspostLink: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
url: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
path: /articles/create-a-simple-note-taking-app-with-deno-3k7g
canonicalUrl: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
cover_image: https://res.cloudinary.com/practicaldev/image/fetch/s--C5akmjmD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/iqgn45udsox4sxpq6olm.png
---

Since Deno 1.0 version was released last week it started to really caught the attetion of all us from the JavaScript Community, especially on the server-side of the JavaScript ecosystem. Deno isn't just a new Technology, it came here to stay.

For those who don't know, Deno is a secure runtime for TypeScript and JavaScript, it was invented by same creator of Node.js, Ryan Dahl.
It is written in TypeScript and Rust and built on top of V8 Engine.

In this tutorial we're gonna build a simple _command-line interface_ for taking notes. We're gonna explore one of his Standard Modules like File System operations (Read and Write JSON files) and Third-party modules to create command-line interfaces and customizing colors.

Without further do, Let's get started

## Installation

Shell (macOS, Linux)

```bash
$ curl -fsSL https://deno.land/x/install/install.sh | sh
```

Powershell (Windows)

```bash
$ iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Homebrew (macOS)

```bash
$ brew install deno
```

Chocolatey (Windows)

```bash
$ choco install deno
```

## Folder scructure

```
.
├── data
│   └── notes-data.json
└── src
    ├── app.ts
    └── notes.ts
```

First off, let's create our initial json file containing our notes,
open `notes-data.json` and write the following

```json{codeTitle: data/notes-data.json}
[
  {
    "title": "Note one",
    "body": "Go to the Grocery Store"
  },
  {
    "title": "Note two",
    "body": "Watch a TV Show"
  }
]
```

Now go to `app.ts` and write the following

> I wrote the whole application in Typescript, but nothing stops you to write in Plain JavaScript

```ts{codeTitle: src/app.ts}
// Thirty-party modules
import Denomander from 'https://deno.land/x/denomander/mod.ts'

// Local imports
import * as notes from './notes.ts'

const program = new Denomander({
  app_name: 'Notes App',
  app_description: 'Create notes in json format from the command-line',
  app_version: '1.0.0',
})

interface INote {
  title: string
  body: string
  newTitle?: string
  newBody?: string
}
```

We are using a third-party module called Denomander, it's like commander.js, we will use it to create commands for us to run in the terminal

## Writing commands

After declaring, let's implements our commands.

```ts{codeTitle: src/app.ts}
...

// Add command
program
  .command('add [title] [body]')
  .description('Add a new note')
  .action(({ title, body }: INote) => {
    const note = { title, body };
    notes.createNote(note);
  });

// List command
program
  .command('list')
  .description('List all notes')
  .action(() => {
    notes.listNotes();
  });

// Read command
program
  .command('read [title]')
  .description('Read a note')
  .action(({ title }: INote) => {
    notes.readNote(title);
  });

// Update command
program
  .command('update [title] [newTitle] [newBody]')
  .description('Update a note')
  .action(({ title, newTitle, newBody }: INote) => {
    notes.updateNote(title, String(newBody), String(newTitle));
  });

// Remove command
program
  .command('remove [title]')
  .description('Remove a note')
  .action(({ title }: INote) => {
    notes.removeNote(title);
  });

program.parse(Deno.args);
```

Great! Now our application is will be able to respond to list, add, read, update and remove commands.

## Writing operations

Now Let's write some I/O operations

Open `notes.ts` and import our modules like this:

```ts{codeTitle: src/notes.ts}
// Standard deno modules
import { readJsonSync, writeJsonSync } from 'https://deno.land/std/fs/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'

// Thirty party modules
import iro, {
  bold,
  yellow,
  inverse,
  red,
  bgGreen,
} from 'https://deno.land/x/iro/src/iro.ts'

const currentDir = Deno.cwd()
const notesFilePath = path.resolve(`${currentDir}/data/notes-data.json`)
```

`readJsonSync` and `writeJsonSync` are two helpers functions that we're going to use to manipulate our notes. If you know some of Node.js, you'll notice that it's pretty similiar to readFileSync and writeFileSync from the standard Node.js `fs` module.

Let's implement our first operations

```ts{codeTitle: src/notes.ts}
...
interface INote {
  title: string;
  body: string;
}

export function fetchNotes() {
  try {
    const notesParsed: any = readJsonSync(notesFilePath);
    return notesParsed;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export function listNotes() {
  const notesList: INote[] = fetchNotes();

  console.log(iro(' Your notes ', inverse));
  for (const note of notesList) {
    console.log(' - ', note.title);
    console.log('●'.padStart(5), note.body);
  }
}
export function saveNotes(notes: INote[]) {
  writeJsonSync(notesFilePath, notes, { spaces: 2 });
}
export function createNote({ title, body }: INote) {
  const notesList = fetchNotes();
  const isDuplicate = notesList.find((note: INote) => note.title === title);
  if (!isDuplicate) {
    notesList.push({ title, body });
    saveNotes(notesList);

    console.log(iro('New note added!', bgGreen));
  } else {
    console.log(iro('Note title already taken!', inverse, red));
  }
}
export function readNote(title = 'Untitled') {
  const notesList = fetchNotes();
  const searchedNote = notesList.find(
    (note: INote) =>
      note.title.toLocaleLowerCase() === title.toLocaleLowerCase()
  );
  if (searchedNote) {
    console.log(iro(searchedNote.title, inverse));
    console.log(searchedNote.body);
  } else {
    console.log(iro('Note not found!', bold, inverse, red));
  }
}
```

The app is going to fetch our initial notes, and then perform operations to list, create or read notes

Moving on:

```ts{codeTitle: src/notes.ts}
...
export function removeNote(title: string) {
  const notesList = fetchNotes();
  const notesToKeep = notesList.filter(
    (note: INote) => note.title.toLowerCase() !== title.toLowerCase()
  );
  if (notesList.length > notesToKeep.length) {
    saveNotes(notesToKeep);

    console.log(iro('Note removed!', bgGreen));
  } else {
    console.log(iro('No note found!', inverse, yellow));
  }
}

export function updateNote(title: string, newBody: string, newTitle: string) {
  const notesList = fetchNotes();
  const currentNote = notesList.find(
    (note: INote) => note.title.toLowerCase() === title.toLowerCase()
  );
  const newNote = { title: newTitle, body: newBody };
  if (currentNote) {
    notesList.splice(notesList.indexOf(currentNote), 1, newNote);
    saveNotes(notesList);

    console.log(iro('Note updated!', bgGreen));
  } else {
    console.log(iro('This note does not exists', inverse, yellow));
  }
}
```

Our application now can remove and update notes based on the title.

## Experimenting

Last but not least, let's run your program.

```bash
deno run --unstable --allow-write --allow-read src/app.ts add "Note" "my new note"
// or
deno run --unstable -A src/app.ts add "Note 3" "my new note"

```

> Deno does not provide with default access to files, so you need to expecility define the flags to read and write.

```bash
deno run --unstable --allow-read src/app.ts read "Note 3"

Note 3
my new note
```

```bash
deno run --allow-read src/app.ts list

 -  Note one
    ● Go to the Grocery Store
 -  Note two
    ● Watch a TV Show
 -  Note 3
    ● my new note
```

You can see all the commands and source code of this application in [this repo](https://github.com/jeferson-sb/deno-notes-cli).

That's all folks!
This my very first post entirely in english, So I'd love hear your opinion,
please leave a comment in the section below.
