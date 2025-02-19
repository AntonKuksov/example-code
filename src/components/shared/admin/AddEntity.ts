import { ChangeEvent, useState } from "react";
import { useForceUpdate } from "framer-motion";
import { addEntity } from "../../../services/general.ts";
import SingleInputCard from "../SingleInputCard.tsx";

export default function AddEntity(props: { name: string; redirect: boolean }) {
  const { name, redirect } = props;
  const [entity, setEntity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [update] = useForceUpdate();

  function add() {
    addEntity(name, { name: entity })
      .then(data => {
        setErrorMessage("");
        setSuccessMessage(`Added ${name} ${entity}`);
        update();
        if (redirect) location.href = `/${name}?id=${data.id}`;
      })
      .catch(err => {
        setErrorMessage(
          `Failed to create ${name}: ${err.response.status}, ${err.response.data.message}`
        );
        setSuccessMessage("");
      });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setEntity(e.target.value);
  }

  return SingleInputCard(
    name,
    successMessage,
    errorMessage,
    add,
    entity,
    onChange
  );
}
