import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

//PARA PEGAR DADOS DA API
function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  //para evitar q o componente se auto-execute e rode em loop infinito
  //assim rodamos fetch só uma vez
  useEffect(() => {
    setIsLoading(true);
    fetch("https://react-aula-routing-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //terminou de carregar os dados da API
        const meetups = [];

        for (const key in data) {
          //pra cada item do objeto(data) vindo da api, passo ele com o "..." pra dentro de meetup
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
