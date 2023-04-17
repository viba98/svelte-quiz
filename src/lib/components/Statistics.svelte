<script>
  import { getStats } from "../utilities/repository";
  const { nGames, lastStreak, maxStreak, average } = getStats();
  const formatedAverage = (average * 100).toLocaleString("en", {
    maximumFractionDigits: 2,
  });
</script>

<div class="statistics-container">
  <h4>Statistics</h4>
  <div class="statistics">
    <div class="statistics__group">
      <p class="statistics__value">{nGames}</p>
      <p class="statistics__label">Played</p>
    </div>
    <div class="statistics__group">
      <p class="statistics__value">
        {formatedAverage}
      </p>
      <p class="statistics__label">Correct %</p>
    </div>
    <div class="statistics__group">
      <p class="statistics__value">{lastStreak}</p>
      <p class="statistics__label">Last Score</p>
    </div>
    <div class="statistics__group">
      <p class="statistics__value">{maxStreak}</p>
      <p class="statistics__label">Max Score</p>
    </div>
  </div>
  <h4>Score distribution</h4>
</div>

<style>
  h4 {
    letter-spacing: 0.05em;
    text-transform: uppercase;
      font-size: 1.4rem;
      line-height: 3rem;
      margin-top: 0.8rem;
      margin-bottom: 0.3rem;

  }

  .statistics-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }

  .statistics {
    display: flex;
  }

  .statistics__group {
    flex: 1;
    margin-left: 0.8rem;
  }

  .statistics__value {
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.17rem;
    font-variant-numeric: proportional-nums;
      font-size: 3rem;
      line-height: 3.2rem;

  }

  .statistics__label {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
  }
</style>
