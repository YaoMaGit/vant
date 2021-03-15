import { defineComponent } from 'vue';
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';

const [name, bem] = createNamespace('sidebar');

export const SIDEBAR_KEY = Symbol(name);

export type SidebarProvide = {
  getActive: () => number;
  setActive: (value: number) => void;
};

export default defineComponent({
  name,

  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(SIDEBAR_KEY);

    const getActive = () => +props.modelValue;

    const setActive = (value: number) => {
      if (value !== getActive()) {
        emit('update:modelValue', value);
        emit('change', value);
      }
    };

    linkChildren({
      getActive,
      setActive,
    });

    return () => <div class={bem()}>{slots.default?.()}</div>;
  },
});