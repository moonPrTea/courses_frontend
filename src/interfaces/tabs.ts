export interface SwitchTabs {
  id: number;
  label: string;
}

export interface SwitchTabsProperties {
  tabs: SwitchTabs[];
  currentName: string;
  currentIndex?: number;
}
