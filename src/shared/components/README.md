# Components

Vue template files in this folder are automatically imported.

## 🚀 Usage

Importing is handled by [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components). This plugin automatically imports `.vue` files created in the `src/components` directory, and registers them as global components. This means that you can use any component in your application without having to manually import it.

The following example assumes a component located at `src/components/MyComponent.vue`:

```vue
<template>
<<<<<<< HEAD
  <div><MyComponent /></div>
</template>

<script lang="ts" setup>
  //
=======
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
//
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
```

When your template is rendered, the component's import will automatically be inlined, which renders to this:

```vue
<template>
<<<<<<< HEAD
  <div><MyComponent /></div>
</template>

<script lang="ts" setup>
  import MyComponent from "@/components/MyComponent.vue";
=======
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
import MyComponent from "@/components/MyComponent.vue";
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
```
