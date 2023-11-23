<template>
  <div class="home-content">
    <div class="home-container reverse">
      <div class="image-wrapper">
        <img src="/analysis.png" alt="" class="analysis-image"/>
      </div>
      <div class="text">
        <div class="title"><h1>Mitobet - obstawiaj inaczej</h1></div>
        Według danych statystycznych, szacuje się, że około 6 milionów Polaków obstawia u bukmachera. Firmy bukmacherskie z pewnością z tego powodu nie ubolewają. Kursy, które proponują, są zawsze delikatnie zaniżone. Dzięki temu, przy ogromnej ilości klientów z matematycznego punktu widzenia, bukmacherzy mają większy zarobek niż gracze. Przykładem może być tu chociażby mecz siatkówki, w którym nie ma faworyta. Kursy nie wynoszą wtedy 2.0 vs 2.0, tylko bardziej 1.9 vs 1.9.
        <br/><br/>
        Jednak mimo że strategie bukmacherskie są skuteczne dla szerokiej grupy graczy, to nie zawsze sprawdzają się dla jednostek. Przykładem tego może być chociażby głośne wydarzenie z "zbanowaniem" dr. Marcina Krzywkowskiego przez firmy bukmacherskie. Szło mu zbyt dobrze, żeby mógł być dalej ich klientem. Bukmacherzy, jak wszystkie inne firmy, wolą zarabiać na swoim biznesie niż wychodzić w nim na minus.
        <br/><br/>
      </div>
    </div>
    <div class="home-container">
      <div class="text">
        Słabą stroną bukmacherów jest fakt, że nie są w stanie przewidzieć dokładnego przebiegu danego wydarzenia. Ich kursy często nie odzwierciedlają rzeczywistego prawdopodobieństwa zdarzeń. Doskonale ilustruje to zjawisko tzw. "freebetów" – strategii, w której stawia się przeciwstawne typy na to samo wydarzenie, ale u różnych bukmacherów. W przypadku znalezienia zdarzenia, gdzie różnice w kursach są znaczne, obstawiający może zyskać, niezależnie od rezultatu spotkania. Obecnie jednak to podejście jest bardzo trudne do zrealizowania, ponieważ bukmacherzy stosują programy komputerowe automatycznie wycofujące takie zakłady. Niemniej jednak dobrze ilustruje to, że kursy nigdy nie odzwierciedlają idealnie szans, otwierając przestrzeń do pewnych strategii dla spostrzegawczych graczy.
        <br/><br/>
        Odpowiednia analiza całego "kontekstu" danego wydarzenia jest tak naprawdę głównym czynnikiem zwiększającym szanse na zgarnięcie wygranej - i to właśnie oferuje Mitobet. Budujemy społeczność, w której serwis nasz stanowi solidne oparcie dla pasjonatów zakładów sportowych. Nasze przewidywania są wynikiem doświadczenia, gruntownej analizy i skutecznego wykorzystania narzędzi. Zapraszamy Cię do dołączenia do grupy Mitobet, gdzie nie tylko dzielimy się naszymi prognozami, ale także tworzymy wspólnotę entuzjastów gotową do wymiany wiedzy i doświadczeń. Skorzystaj z naszej oferty subskrypcji i zwiększ swoje szanse na sukces w typowaniu zakładów sportowych!
      </div>
      <div class="image-wrapper">
        <img src="/analysis2.png" alt="" class="analysis-image"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

h1{
  text-align: left;
}

.text{
  text-align: left;
}

.home-content {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.image-wrapper{
  height: 100%;
  display: flex;
  align-items: center;
}

.home-container{
  display: flex;
  gap: 40px;
  max-width: 100%;
  justify-content: center;
}

.analysis-image{
  max-width: 300px;
  border-radius: 50%;
  width: 300px;
}

@media (max-width: 850px) {
  .home-container{
    flex-wrap: wrap;
  }
  .reverse{
    flex-flow: wrap-reverse;
  }
  .analysis-image{
    width: 100%;
  }
  .image-wrapper{
    height: min-content;
  }
}

</style>