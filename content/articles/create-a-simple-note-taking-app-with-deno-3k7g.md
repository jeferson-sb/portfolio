---
id: 340405
title: Create a simple Note-taking app with Deno
slug: create-a-simple-note-taking-app-with-deno-3k7g
published_at: 2020-05-20T21:33:59.131Z
tags: deno,javascript,typescript,tutorial
excerpt: Since Deno 1.0 version was released last week it started to really caught the attetion of all us from the JavaScript Community, especially on the server-side of the JavaScript ecosystem. Deno isn't just a new Technology...
crosspostedOn: Dev.to
crosspostLink: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
url: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
path: /articles/create-a-simple-note-taking-app-with-deno-3k7g
canonicalUrl: https://dev.to/jeferson_sb/create-a-simple-note-taking-app-with-deno-3k7g
cover_image: https://res.cloudinary.com/practicaldev/image/fetch/s--C5akmjmD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/iqgn45udsox4sxpq6olm.png
---

Since [Deno](https://deno.land/) 1.0 version was released last week it started to really catch the attention of all of us from the JavaScript Community, especially on the server-side of the ecosystem.

For those who don't know, Deno is a secure runtime for TypeScript and JavaScript, it was invented by the same creator of Node.js, Ryan Dahl.
It is written in TypeScript and Rust and built on top of V8 Engine.

In this tutorial, we're going to learn Deno by building a simple _command-line interface_ for taking notes. We're going to go through his Standard Modules like File System operations (Read and Write JSON files) and Third-party modules to create commands and interact with the terminal.

Without further do, Let's get started!

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

We can test if the Deno is successfully installed by running this example app in your command line:

```sh
$ deno run https://deno.land/std/examples/welcome.ts
```

## Application scructure

```bash
.
├── data
│   └── notes-data.json
└── src
    ├── app.ts
    └── notes.ts
```

First off, let's create our initial json file containing our notes,
open `notes-data.json` and write the following:

```json
// data/notes-data.json
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

Now we switch to our `src` folder and open `app.ts` to bootstrap our application:

```ts
// src/app.ts

// Thirty-party modules
import Denomander from 'https://deno.land/x/denomander/mod.ts'

// Local imports
import * as notes from './notes.ts'

const program = new Denomander({
  app_name: 'Deno Notes App',
  app_description: 'Create notes in json format from the command line',
  app_version: '1.0.0',
})
```

We are using a third-party module called Denomander, it's pretty much like [commander.js](https://github.com/tj/commander.js/), we will use it to create commands for us to run in the terminal.

## Writing commands

After declaring our program we're going to implement five commands:

```ts
...

// Add command
program
  .command("add")
  .description("Add a new note")
  .action(() => {
    const title = prompt("Note title:") ?? "Note three";
    const body = prompt("Note body:") ?? "";
    notes.createNote({ title, body });
  });

// List command
program
  .command("list")
  .description("List all notes")
  .action(() => {
    notes.listNotes();
  });

// Read command
program
  .command("read")
  .description("Read a note")
  .action(() => {
    const title = prompt("Note title: ") ?? "Note one";
    notes.readNote(title);
  });

// Update command
program
  .command("update")
  .description("Update a note")
  .action(() => {
    const existingNote = prompt(
      "What note do you want to update? [title]",
    ) as string;
    const title = prompt("New title:") ?? "Note one";
    const body = prompt("New body:") ?? "";
    notes.updateNote(existingNote, { title, body });
  });

// Remove command
program
  .command("remove")
  .description("Remove a note")
  .action(() => {
    const title = prompt("Note title:") ?? "Note one";;
    notes.removeNote(title);
  });

program.parse(Deno.args);
```

Deno 1.5 introduced `prompt` API to interact with input from the user, so our application is now able to respond to list, add, read, update and remove commands.

## Writing operations

Then we can implement each separately, so let's write some I/O operations:

Open `notes.ts` file and import the following modules:

```ts
// src/notes.ts

// Standard deno modules
import * as path from 'https://deno.land/std/path/mod.ts'

// Thirty party modules
import iro, {
  bgGreen,
  bold,
  inverse,
  red,
  yellow,
} from 'https://deno.land/x/iro/src/iro.ts'

const currentDir = Deno.cwd()
const notesFilePath = path.resolve(`${currentDir}/data/notes-data.json`)
```

[path](https://deno.land/std@0.92.0/path) is a file system standard module that we're going to use to manipulate file paths and directories . If you know some of Node.js, you'll notice that it's pretty similar to the `path` module.

[iro](https://deno.land/x/iro@1.0.3) is a third-party terminal coloring and styles utility module.

Now Let's implement our first operations

```ts
// src/notes.ts

interface Note {
  title: string
  body: string
}

export async function fetchNotes() {
  try {
    const file = await Deno.readTextFile(notesFilePath)
    const notes: Note[] = JSON.parse(file)
    return notes
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function listNotes() {
  const notesList: Note[] = await fetchNotes()

  console.log(iro(' Your notes ', inverse))
  for (const note of notesList) {
    console.log(' - ', note.title)
    console.log('●'.padStart(5), note.body)
  }
}

export async function saveNotes(notes: Note[]) {
  try {
    await Deno.writeTextFile(notesFilePath, JSON.stringify(notes))
  } catch (error) {
    throw new Error(`Unable to write contents to file: ${error}`)
  }
}
```

Our app is going to fetch our initial notes, and then perform operations to list and save notes.

Deno's runtime API provides the `Deno.readTextFile` and `Deno.writeTextFile` asynchronous functions for reading and writing entire files as text files.

Moving on, with these methods we are able to create and read commands:

```ts
// src/notes.ts

export async function createNote({ title, body }: Note) {
  const notesList = await fetchNotes()
  const isDuplicate = notesList.find((note: Note) => note.title === title)
  if (!isDuplicate) {
    notesList.push({ title, body })
    await saveNotes(notesList)

    console.log(iro('New note added!', bold, bgGreen))
  } else {
    console.log(iro('Note title already taken!', inverse, red))
  }
}

export async function readNote(noteTitle: string) {
  const notesList = await fetchNotes()
  const searchedNote = notesList.find((note: Note) => {
    return note.title.toLocaleLowerCase() === noteTitle.toLocaleLowerCase()
  })

  if (searchedNote) {
    console.log(iro(searchedNote.title, inverse))
    console.log(searchedNote.body)
  } else {
    console.log(iro('Note not found!', bold, inverse, red))
  }
}
```

Finally, we implement the last two I/O operations for updating and removing our notes.

```ts
// src/notes.ts

export async function removeNote(title: string) {
  const notesList = await fetchNotes()
  const notesToKeep = notesList.filter(
    (note: Note) => note.title.toLowerCase() !== title.toLowerCase()
  )
  if (notesList.length > notesToKeep.length) {
    await saveNotes(notesToKeep)

    console.log(iro('Note removed!', bgGreen))
  } else {
    console.log(iro('No note found!', inverse, yellow))
  }
}

export async function updateNote(note: string, { title, body }: Partial<Note>) {
  const notesList = await fetchNotes()
  const currentNote = notesList.find(
    (n: Note) => n.title.toLowerCase() === note.toLowerCase()
  )
  const newNote = { title, body } as Note

  if (currentNote) {
    notesList.splice(notesList.indexOf(currentNote), 1, newNote)
    await saveNotes(notesList)

    console.log(iro('Note updated!', bgGreen))
  } else {
    console.log(iro('This note does not exists', inverse, yellow))
  }
}
```

Our application now can remove and update notes based on the title.

## Experimenting

Last but not least, we can run our program by entering one of these commands:

```bash
$ deno run --unstable --allow-write --allow-read src/app.ts add

// or

$ deno run --unstable -A src/app.ts add

Note title: Note three
Note body: This a new note
```

By the time of this writing, some of these APIs are still experimental, so we need a `--unstable` flag to run it.

Deno does not provide default access to files, so you need to explicitly define the flags to read and write.

```bash
$ deno run --unstable --allow-read src/app.ts read

Note title: Note 3

- Note 3
● my new note
```

We also use --allow-read to list our notes:

```bash
$ deno run --allow-read src/app.ts list

 -  Note one
    ● Go to the Grocery Store
 -  Note two
    ● Watch a TV Show
 -  Note 3
    ● my new note
```

You can see all the commands and the source code of this application in [this repo](https://github.com/jeferson-sb/deno-notes-cli).

That's all folks!
This my very first post written entirely in English, So I'd love to hear your opinion, if you have any questions please leave a comment in the section below.
