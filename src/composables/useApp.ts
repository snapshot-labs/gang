import { computed, reactive } from 'vue';
import { getInstance } from '@snapshot-labs/lock/plugins/vue3';
import { useWeb3 } from '@/composables/useWeb3';
import { getSpreadsheet } from '@/helpers/spreadsheet';

const state = reactive({
  init: false,
  loading: false,
  circles: {},
  members: {},
  domains: []
});

const { login } = useWeb3();

export function useApp() {
  async function init() {
    const auth = getInstance();
    state.loading = true;

    const sheetId = '1RImky_yuB7pl7TLDqDMIj9d1EKDYFaN1HIF1ozMhUTo';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq=SELECT%20*`;
    const results = await Promise.all([
      getSpreadsheet(`${url}&gid=0`),
      getSpreadsheet(`${url}&gid=637403457`),
      getSpreadsheet(`${url}&gid=1503558301`)
    ]);
    state.circles = Object.fromEntries(
      results[0].map(circle => [circle.id, circle])
    );
    state.members = Object.fromEntries(
      results[1].map(member => [member.id, member])
    );
    state.domains = results[2];

    // Auto connect with gnosis-connector when inside gnosis-safe iframe
    if (window?.parent === window)
      auth.getConnector().then(connector => {
        if (connector) login(connector);
      });
    else login('gnosis');

    state.init = true;
    state.loading = false;
  }

  return {
    init,
    app: computed(() => state)
  };
}
