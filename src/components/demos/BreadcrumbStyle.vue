<template>
  <div class="container">
    <pre></pre>
    <div class="breadcrumb-container">
      <ul class="breadcrumb">
        <li>Electronics</li>
        <li>Computers & Accessories</li>
        <li>Gaming</li>
        <li>Laptops</li>
      </ul>
    </div>
    <pre>--variant: arrow</pre>
    <div class="breadcrumb-container" style="--variant: arrow">
      <ul class="breadcrumb">
        <li>Electronics</li>
        <li>Computers & Accessories</li>
        <li>Gaming</li>
        <li>Laptops</li>
      </ul>
    </div>
    <pre>--variant: bordered</pre>
    <div class="breadcrumb-container" style="--variant: bordered">
      <ul class="breadcrumb">
        <li>Electronics</li>
        <li>Computers & Accessories</li>
        <li>Gaming</li>
        <li>Laptops</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  overflow-x: auto;
}

pre {
  font-size: var(--text-sm);
}

.breadcrumb-container {
  container-name: breadcrumb;
  container-type: inline-size;
  display: flex;
}

.breadcrumb {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  padding: 0.75rem 0;
  --separator: " / ";
  --opacity: 0.7;
  border: var(--breadcrumb-border);
  border-right: unset;
  border-left: unset;

  & li {
    margin: 0;
    color: var(--link-color);
  }

  & li:not(:last-child) {
    opacity: var(--opacity);
  }

  & li::after {
    content: var(--separator);
  }

  & li:last-child::after {
    content: "";
  }
}

@container style(--variant: arrow) {
  li {
    --separator: " ➜ ";
    --link-color: lch(79 59.21 203.28);
  }
}

@container style(--variant: bordered) {
  ul {
    --breadcrumb-border: 1px solid var(--color-silver);
  }

  li {
    --link-color: var(--color-silver);
    --separator: " ➤ ";
  }
}
</style>
