import Switch from "./Switch";

export default function OnOffSwitch({ ...attributes }) {
  return (
    <Switch
      css={{ flex: "0 0 auto !important" }}
      items={[
        { value: true, label: "On" },
        { value: false, label: "Off" },
      ]}
      {...attributes}
    />
  );
}
