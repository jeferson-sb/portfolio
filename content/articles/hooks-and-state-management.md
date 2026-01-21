---
id: 8odi10fzkb
published_at: 2026-01-21T01:25:28.903Z
excerpt: After spending a fair amount of time battling with state management solutions and the devious uses of them in front-end applications. I came to realize that even though we got into a position where it's fairly...
crosspostedOn:
crosspostLink:
title: Abstracting State Management for Scalable Front-end Applications
tags: react, state-management
slug: hooks-and-state-management
og_image: https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/og%2Fhooks-and-state-management.webp?alt=media&token=ad2006ca-f93d-4d98-af6b-98f360af0a97
---

After spending a fair amount of time battling with state management solutions and the devious uses of them in front-end applications. I came to realize that even though we got into a position where it's fairly <i>accessible</i> to write complex logic that doesn't require too much boilerplate, most of the time, we're still **overloading** our UI layer with **state** and **business logic** that shouldn't be there.

Not having a clear separation between the UI layer and the State layer can lead to common issues, such as:

- No clear data flow
- Coupled dependencies that are hard to maintain
- Less composability and unclear separation of concerns

OK, so how do we decouple the view from state in front-end apps while not bringing more complexity?

The interesting fact is that by abstracting code with **custom hooks**, a feature you might already be familiar with, around some architecture layers such as _domain_ and _use cases_ can help you out.

## State layer

The state layer is responsible for managing UI state, such as fetching data, user input and behavior, custom events, etc.
The UI layer doesn't ever modify the state, but the State layer does.
The rest of the application shouldn’t know about the state layer or any of the libraries being used (Zustand, Redux, Xstate).
We just tell it how the data is being shaped and how to trigger changes to the state.

## Use cases
Use cases tell what our application does at a high level. Similar to a recipe for each feature. They define the application as a collection of cases.

## Local state, URL params, Redux or Zustand ?

You can be using plain local state, URL search params with nuqs, complex state with Redux or Zustand, it doesn't really matter.
There are two things that always exist: **reading** state and **writing** state.

One common situation is that, as you declare state variables and their mutations that are going to be dispatched from the UI, it can be tempting to hold all of the logic inside the component. That can easily make your components more and more complex to maintain...

```ts
// Redux example
const MusicPlayer = () => {
  const progress = useSelector(state => state.track.progress);
  const duration = useSelector(state => state.track.duration);
  const isPlaying = useSelector(state => state.track.isPlaying);
  const currentSongIndex = useSelector(state => state.track.currentSongIndex);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(updateProgress(currentSongIndex))
    dispatch(setIsPlaying())
    // audio.play()
  }

  // ... more 500 lines ...
}
```

- How do we test it?
- What if we need Context? How do we replace the state management solution if we need to?

### Custom hooks

So, the first strategy is simple: use hooks as a way to decouple the view and state layers.

A state hook is essentially a read/write model of the state:

```ts
const useMusicPlayerTrack = () => {
  // State
  const progress = useSelector(state => state.track.progress);
  const duration = useSelector(state => state.track.duration);
  const isPlaying = useSelector(state => state.track.isPlaying);
  const currentSongIndex = useSelector(state => state.track.currentSongIndex);

  // Actions
  const dispatch = useDispatch();
  const setCurrentTrack = () => {
    dispatch(updateProgress(currentSongIndex));
    dispatch(setIsPlaying());
  }

  // Interface
  // Here you expose data for convenience of the UI
  // be it derived state, computed state, group of actions, etc
  return { progress, duration, setCurrentTrack };
};

const MusicPlayer = () => {
  const { progress, duration, setCurrentTrack } = useMusicPlayerTrack()

  return <div>...</div>
}
```

The idea behind this is to have a _small layer of abstraction_ to encapsulate state, actions, and the public interface for the logic that we need. We don't need to worry about where the state is coming from or how it is being persisted; we only care about commands/interactions that we need for our business case.

If we ever need to change from Redux to Context API, we can do it.

```ts
import { MusicPlayerTrackContext } from './context/MusicPlayerTrackContext'

// supposing MusicPlayerTrackContext **value** already matches our interface
const useMusicPlayerTrack = () => {
  return use(MusicPlayerTrackContext); // or useContext(MusicPlayerTrackContext)
}
```

## Using domain concepts to improve it

Remember what I said about use cases? This is where it gets interesting.

At a higher level, we choose use cases to represent **user intent**. They hold the responsibility of filling the gap between the different layers in your application.

Use case: Input ➙ Delegate work to services ➙ Uses domain business logic ➙ Gets result ➙ Prepare ➙ Provide data

Let's go step by step:


- 1. Define the specification for use case hook:

```ts
function makeStatefulUseCaseHook(statefulUseCase) {
  return function useCaseHook(args) {
    const [state, setState] = useState(() => statefulUseCase.initialState(args))

    return useMemo(() => {
      const context = {
        state, setState, args
      }
      return statefulUseCase.interface(context)
    }, [state, setState, args])
  }
}
```

In this step, we define a fabric for creating new custom hooks around local state (`useState()`) while also providing the context for how to interact with it.

- 2. Create the first use case

```ts
const playSong = () => ({
  initialState: () => ({
    isPlaying: false,
    currentSongIndex: 0,
    metadata: {}
  }),
  interface: ({ state, setState }) => ({
    playing: state.isPlaying,
    title: state.metadata.title,
    goToNextSong(track) {
      setState({
        ...state,
        isPlaying: true,
        currentSongIndex: state.currentSongIndex + 1,
        metadata: track.metadata
      })

      // you can do more than manipulating state here!
      // Song.transcript(track)
      // musicTrackRepository.getNextSong()
      // fetch(), etc
    },
  })
})
```

Here we design our use case with a base state (`initialState`) and use the higher level `state` and `setState` implementation to define new actions without worrying about what technology is underneath it.

- 3. Instantiate and use it!

```ts

const usePlaySong = makeStatefulUseCaseHook(playSong())

// OR assign to a container (DI)
const container = {
  usePlaySong
}

const { goToNextSong, playing, title } = usePlaySong()
```

### Testing

Testing is as simple as mocking the return value of the stateful hook:

```ts
describe('useMusicPlayer', () => {
  it('return new track in playlist', () => {
    vi.mocked(usePlaySong).mockReturnValue({
      playing: true,
      title: "Eminem - Beautiful",
      goToNextSong: vi.fn()
    })
    const { getByText } = render(<MusicPlayer />)

    expect(getByText('Eminem - Beautiful')).toBeInTheDocument()
  });
});
```


### Benefits of this approach

- Uses architecture concepts to isolate complexity
- Provides better testing instrumentation (e.g., use cases are not coupled to Redux implementation)
- Better type inference

If you would like to learn more about this, check out this series from the [Codeminer folks](https://blog.codeminer42.com/category/scalable-frontend/)
