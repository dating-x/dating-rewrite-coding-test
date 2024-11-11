<template>
  <div>
    <div class="relative" data-testid="profile-card-link" @click="handleViewProfileClick">
      <AvatarImg
        data-testid="profile-card-img"
        class="w-fill mb-3.75 size-[50px] min-h-[200px] min-w-[50px] overflow-hidden rounded"
        :class="{ 'cursor-pointer': withAction?.view }"
        :image="image"
        :fallback-src="maleImageUrl"
        :alt="imgAlt"
        @click="handleViewProfileClick"
      />
      <nav v-if="withAction" class="absolute bottom-0 right-0 flex w-auto justify-end">
        <template v-for="action in Object.keys(withAction).filter((actionName) => actionName !== 'view')">
          <StyledButton
            v-if="withAction[action]"
            :key="action"
            size="xxs"
            class="border-r border-[#ffffff80]"
            @click.prevent.stop="handleAction(action)"
          >
            <template #icon>
              <i
                v-if="action === 'upgrade'"
                data-testid="pc-upgrade-premium"
                class="icon icon-ribbon-white relative top-[1px] m-1 size-[20px]"
                :title="$t('upgrade')"
              />
              <i
                v-if="action === 'favorite'"
                data-testid="card-favorite-heart"
                class="m-1"
                :class="`fa fa-heart${isFavorited ? '' : '-o'} font-bold`"
                :title="$t('favorite')"
              />
              <i
                v-if="action === 'message'"
                data-testid="pc-message"
                class="icon icon-envelope-solid m-1"
                :title="$t('message')"
              />
            </template>
          </StyledButton>
        </template>
      </nav>
    </div>

    <h3 data-testid="profile-card-title" class="truncate text-2xl font-medium text-inherit">
      {{ title }}
    </h3>

    <slot name="description" />
  </div>
</template>

<script lang="ts" setup>
  import maleImageUrl from '@images/male.png';
  import { PropType } from 'vue';
  import { ImageApiDTO } from '@/Types/Responses';
  import AvatarImg from '@/Components/AvatarImg.vue';
  import StyledButton from '@/Components/FormElements/StyledButton.vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },

    image: {
      type: Object as PropType<ImageApiDTO> | null,
      default: null,
    },

    imgAlt: {
      type: String,
      default: 'avatar',
    },

    withAction: {
      type: Object,
      default: () => {},
    },

    isFavorited: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['favorite', 'view', 'message', 'upgrade']);

  const handleAction = (action: string) => {
    if (action === 'favorite' || action === 'view' || action === 'message' || action === 'upgrade') {
      emit(action);
    } else {
      console.error('Invalid action:', action);
    }
  };

  const handleViewProfileClick = () => {
    if (props.withAction?.view === true) {
      emit('view');
    }
  };
</script>
