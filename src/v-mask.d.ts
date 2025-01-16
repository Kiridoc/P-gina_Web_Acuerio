declare module 'v-mask' {
    import { DirectiveOptions } from 'vue';
    export const VueMaskDirective: DirectiveOptions;
    export const VueMaskPlugin: {
      install(Vue: any): void;
    };
    const vMask: {
      directive: DirectiveOptions;
      install(Vue: any): void;
    };
    export default vMask;
  }
  