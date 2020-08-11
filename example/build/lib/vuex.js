module.exports = `
import actions from './actions.js';
import state from './state.js';
import mutations from './mutations';
import modules from './modules';
{{import}}
export default {
    state: {{{state}}},
    mutations: {{{mutations}}},
    actions: {{{actions}}},
    modules
};
`