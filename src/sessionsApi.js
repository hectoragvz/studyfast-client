import { useSessionsStore } from "./store";
import api from "./api";
import { toast } from "sonner";

// ✅
async function basicUpload(params) {
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${params.accountId}/uploads/binary`;
  const entries = (obj) =>
    Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
  const query = entries(params.querystring ?? {})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join("="))
    .join("&");
  const response = await fetch(
    `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
    {
      method: "POST",
      body: params.requestBody,
      headers: Object.fromEntries(
        entries({
          Authorization: `Bearer ${params.apiKey}`,
          "X-Upload-Metadata": JSON.stringify(params.metadata),
        })
      ),
    }
  );
  const result = await response.json();
  if (Math.floor(response.status / 100) !== 2)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  return result;
}

// ✅
export const getSessions = async () => {
  try {
    const response = await api.get("/api/sessions/");
    useSessionsStore.getState().setSessions(response.data);
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
  }
};

// THE URL OF THE UPLOADED FILE FROM THE FRONT END FAILS -- seems to be correct now (euclidean) ✅ and PINECONE connection was failing - moved to local
export const addSession = async (data) => {
  toast.info("Creating your session, this will only take a minute or two");
  try {
    const res = await basicUpload({
      accountId: import.meta.env.VITE_BYTESCALE_ACCOUNT,
      apiKey: import.meta.env.VITE_BYTESCALE_KEY,
      requestBody: data.file,
    });
    console.log("Upload response from bytescale:", res); // Add this line
    const newData = {
      url: res["fileUrl"],
      requirement: data.requirement,
    };
    console.log("Data to be sent to backend", newData);
    const response = await api.post("/api/sessions/", newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("API response:", response.data); // Add this line
    const newSession = response.data;
    const { sessions, setSessions } = useSessionsStore.getState();
    setSessions([...sessions, newSession]);
    toast.success("Study session created, you can find it on the sidebar now");
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Something went wrong", error);
  }
};

// IF CURRENTLY ON SESSIONVIEW, DELETED CARDS REMAIN THERE
export const deleteSession = async (sessionId) => {
  try {
    await api.delete(`/api/sessions/${sessionId}/`);
    const { sessions, setSessions } = useSessionsStore.getState();
    setSessions(sessions.filter((session) => session.id !== sessionId)); // Remove the session from the store */
    toast.error("Study session deleted");
  } catch (error) {
    toast.error("Failed to delete session");
  }
};

// ✅
export const getSessionCards = async (sessionId) => {
  try {
    const response = await api.get(`/api/sessions/${sessionId}/cards/`);
    useSessionsStore.getState().setCards(response.data);
  } catch (error) {
    console.error("Failed to fetch cards:", error);
  }
};

// ✅
export const deleteCard = (sessionId, cardId) => {
  const deleteSingleCard = async (sessionId, cardId) => {
    await api.delete(`/api/sessions/${sessionId}/cards/${cardId}/`);
    const { cards, setCards } = useSessionsStore.getState();
    setCards(cards.filter((card) => card.id !== cardId)); // Remove the session from the store
    toast.error("Study card deleted");
  };

  try {
    toast("Are you sure you want to delete this card?", {
      action: {
        label: "Delete",
        onClick: () => deleteSingleCard(sessionId, cardId),
      },
    });
  } catch (error) {
    console.error("Failed to delete card:", error);
  }
};

// ✅
export const updateCardState = (sessionId, cardId, newState) => {
  const updateSingleCardState = async (sessionId, cardId, newState) => {
    // Make a PUT request to update the card state
    await api.patch(`/api/sessions/${sessionId}/cards/${cardId}/`, {
      state: newState,
    });
    const { updateCardState } = useSessionsStore.getState();
    updateCardState(cardId, newState); // Update the card state in the store
    if (newState == "done") {
      toast.success("You learned this card, congratulations!");
    } else {
      toast.error("Card was useless, sorry bout that!");
    }
  };

  try {
    toast("Are you sure you want to update this card?", {
      action: {
        label: "Update",
        onClick: () => updateSingleCardState(sessionId, cardId, newState),
      },
    });
  } catch (error) {
    toast.error("Failed to update card state");
  }
};
