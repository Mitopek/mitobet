<template>
  <div class="home-content">
    <div class="home-container">
      <div class="image-wrapper">
        <img src="/analysis.png" alt="" class="analysis-image"/>
      </div>
      <div class="text">
        <div class="title"><h2>Mitobet - obstawiaj inaczej</h2></div>
        Znowu postawiłeś kupon z niskim kursem, ale to przeciwnicy wygrali mecz? Nie bez powodu popularne jest powiedzenie "Nie graj po kursach". Niestety niski kurs dla danego zdarzenia, nigdy nie oznacza pewnej wygranej. Odpowiednia analiza całego "kontekstu" danego wydarzenia jest tak na prawdę głównym czynnikiem zwiększającym ci szanse na zgarnięcie wygranej. Mitobet oferuje przewidywania na poszczególne zdarzenia, poprzedzone:
        <br/><br/>
        <div class="list">
          &#x2022; doświadczeniem,<br/>
          &#x2022; odpowiednią analizą,<br/>
          &#x2022; użyciem odpowiednich narzędzi.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.list{
  line-height: 200%;
  text-align: left;
}

.text{
  text-align: justify;
}

.home-content {
  text-align: center;
  width: 100%;
}

.image-wrapper{
}

.title{
  width: 100%;
  text-align: left;
  padding: 5px;
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
    flex-flow: wrap-reverse;
  }
  .analysis-image{
    width: 100%;
  }
}

</style>