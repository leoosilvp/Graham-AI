import { useEffect, useState } from "react";

function formatDate(dateString) {
  const [day, month, year] = dateString.split("-");

  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return `${months[Number(month) - 1]} ${day}, ${year}`;
}

export default function useNotification() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }

        const result = await response.json();

        const formattedData = result.map(item => ({
          id: item.id,
          type: item.type,
          data: formatDate(item.data),
          imgUrl: item.imgUrl || null,
          videoUrl: item.videoUrl || null,
          title: item.title,
          description: item.description,
        }));

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL]);

  return { notifications: data, loading, error };
}
