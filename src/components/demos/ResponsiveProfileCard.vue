<template>
  <div class="profile">
    <div class="avatar">
      <img src="https://i.pravatar.cc/150?img=31" alt="avatar" width="128" height="128">
      <button type="button">Follow</button>
    </div>
    <div class="name">
      <h4>Sally Ramos</h4>
      <span>@sallyramos</span>
    </div>
    <p class="about">Product Designer at @company. Love to read, play and meditate in my free time.</p>
    <p class="stats"><b>15k</b> Followers • <b>7k</b> Following • Since April 30, 2017</p>
    <button type="button">Follow</button>
  </div>
</template>

<style scoped>
.profile {
  container-name: profile;
  container-type: inline-size;
  background-color: lch(99 0 0);
  color: lch(8.66% 16.54 285.71);
  border-radius: var(--radius-default);
  padding: 2rem;
  padding-block-start: 2.25rem;
}

.name {
  margin-block-end: 1rem;

  & h4 {
    font-size: clamp(1.125rem, 3cqi + .25rem, 4rem);
  }

  & span {
    color: lch(61.87% 10.78 281.66);
  }
}

.about {
  line-height: 1.3;
  width: min(30ch, 100% - 1rem);
}

.stats {
  color: lch(61.87% 10.78 281.66);
}

.stats+button {
  display: none;
}

.avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline-end: 2rem;
  margin-block-end: 1rem;

  & img {
    border-radius: var(--radius-full);
    max-width: 90px;
    max-height: 90px;
    margin: 0;
  }

}

button {
  background-color: lch(8.66% 16.54 285.71);
  border-radius: 3rem;
  padding: 0.50rem 1.75rem;
}

@container (max-width: 400px) {
  .stats {
    display: none;
  }
}

@container (max-width: 300px) {
  .avatar img {
    max-width: unset;
    max-height: unset;
  }

  .avatar {
    padding: 0;
    justify-content: center;
  }

  .about,
  .avatar button {
    display: none;
  }

  .name {
    text-align: center;
  }

  .stats+button {
    display: block;
    margin-inline: auto;
  }
}
</style>
