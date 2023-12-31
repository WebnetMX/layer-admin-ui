<script setup lang="ts">
  import type { Link } from "../../types";

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<{
      level?: number;
      links?: Link[];
      multiple?: boolean;
      defaultOpen?: boolean;
      ui?: Partial<typeof config>;
      class?: any;
    }>(),
    {
      level: 0,
      links: () => [],
      multiple: true,
      defaultOpen: undefined,
      ui: () => ({}),
      class: undefined,
    }
  );

  const config = {
    wrapper: "space-y-3",
  };

  interface LinkGroup {
    type: "link" | "accordion" | null;
    defaultOpen?: boolean;
    children: Link[];
  }

  const { ui, attrs } = useUI(
    "navigation.tree",
    toRef(props, "ui"),
    config,
    toRef(props, "class"),
    true
  );

  const groups = computed<LinkGroup[]>(() => {
    const groups = [];

    let group: LinkGroup = { type: null, children: [] };

    for (const link of props.links) {
      const type = link.children?.length ? "accordion" : "link";
      if (!group.type) group.type = type;

      if (group.type === type) {
        group.children.push(link);
      } else {
        groups.push(group);
        group = { type, children: [link] };
      }
    }

    if (group.children.length) groups.push(group);

    return groups;
  });
</script>

<template>
  <nav v-if="groups?.length" :class="ui.wrapper" v-bind="attrs">
    <template v-for="(group, index) in groups" :key="index">
      <NavigationAccordion
        v-if="group.type === 'accordion'"
        :links="group.children"
        :level="level"
        :multiple="multiple"
        :default-open="defaultOpen"
      />
      <NavigationLinks v-else :links="group.children" :level="level" />
    </template>
  </nav>
</template>
