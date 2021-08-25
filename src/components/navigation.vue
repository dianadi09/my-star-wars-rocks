<template>
  <aside>
    <router-link to="/" title="Home">
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <nav>
      <router-link to="/part1">
        <img src="@/assets/vehicles.png" alt="Part1">
        <p>Part 1</p>
      </router-link>
      <router-link to="/part2">
        <img src="@/assets/planets.png" alt="Part2">
        <p>Part 2</p>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>

<style lang="scss">
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 6px;
  background-color: $star-wars-yellow;
  color: #000;

  img {
    width: 48px;
    height: 48px;
  }

  nav {
    margin-top: 75px;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2px;
      border-radius: 5px;
      margin-bottom: 10px;

      &.router-link-active, &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }

      p {
        display: none;
      }
    }
  }

  @media only screen and (min-width: 640px) {
    img {
      width: 64px;
      height: 64px;
    }

    nav {
      margin-top: 50px;

      a {
        padding: 2px 4px;

        p {
          display: block;
        }
      }
    }
  }
}
</style>
