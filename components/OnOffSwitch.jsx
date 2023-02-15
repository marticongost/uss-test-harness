import Switch from "./Switch";

export default function OnOffSwitch({ ...baseProps }) {
  return (
    <Switch
      css={{ flex: "0 0 auto !important" }}
      items={[
        { value: true, label: "On" },
        { value: false, label: "Off" },
      ]}
      {...baseProps}
    />
  );
}
