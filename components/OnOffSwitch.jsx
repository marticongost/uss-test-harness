import Switch from "./Switch";

export default function OnOffSwitch({ ...attributes }) {
  return (
    <Switch
      items={[
        { value: true, label: "On" },
        { value: false, label: "Off" },
      ]}
      {...attributes}
    />
  );
}
