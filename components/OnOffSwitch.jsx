import Switch from "./Switch";

export default function OnOffSwitch(props) {
  return (
    <Switch
      items={[
        { value: true, label: "On" },
        { value: false, label: "Off" },
      ]}
      {...props}
    />
  );
}
