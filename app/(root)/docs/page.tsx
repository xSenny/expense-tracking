import { getKey } from "@/lib/actions/restapi.actions";

const DocsPage = async () => {

  const key = getKey()

  return (
    <div>
      {key}
    </div>
  )
}

export default DocsPage;