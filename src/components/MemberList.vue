<template>
  <div class="member-list">
    <b-container>
      <b-row>
        <b-col v-for="(member, i) in memberlist" :key="i" cols="2">
          <b-card
            :class="{selected : member.selected}"
            class="mb-4"
            img-top
            tag="article"
            @click="test(i)"
            style="text-align:center; cursor:pointer;">
            <font-awesome-icon class="py-2" fas icon="user" size="5x" />
          <p class="card-text">{{ i+1 + "." }} {{ member.name }} </p>
          <p>{{ "상점 : " +  member.prize }}</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "member-list",
  props: ["memberlist"],
  methods: {
    test(i) {
      this.$vuevent.$emit("idx", i);
    }
  }
};
</script>

<style>
.selected {
  border: 1px solid red;
}
</style>
