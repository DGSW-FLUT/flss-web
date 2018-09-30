<template>
    <div class="interaction-item">
      <b-card no-body>
        <b-card-header v-if="InteractionItem.topic">
          {{ InteractionItem.topic }}
        </b-card-header>
        <b-card-body v-if="InteractionItem.content">
          {{ InteractionItem.content }}
        </b-card-body>
        <b-card-footer v-if="InteractionItem.type !== 1">
          <link-prevue url="https://www.youtube.com/watch?v=9iHM6X6uUH8">
            <template slot-scope="props">
              <b-card :title="props.title"
                    :img-src="props.img"
                    :img-alt="props.title"
                    img-top
                    style="max-width: 20rem;"
                    class="mb-2">
              <small class="text-muted">
                {{ props.description }}
              </small>
            </b-card>
            </template>
          </link-prevue>
        </b-card-footer>
      </b-card>
    </div>
</template>

<script>
import LinkPrevue from 'link-prevue'

export default {
  name: "interaction-item",
  data() {
    return {

    }
  },
  props: ['InteractionItem'],
  components: {
    LinkPrevue
  }
};
</script>

<style lang="scss">
</style>
