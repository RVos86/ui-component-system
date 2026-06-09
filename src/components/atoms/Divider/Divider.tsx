import { TEST_IDS } from '@/test/test-ids';

export function Divider() {
  return <div data-testid={TEST_IDS.divider.root} className={'h-px bg-gray-300'}></div>;
}
