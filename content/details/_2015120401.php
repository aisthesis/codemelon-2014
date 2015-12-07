<div class="page-header">
    <h2>Machine learning for predicting stock growth
    <small><?php echo handle_to_date($_GET['id']); ?></small></h2>
</div>
<div class="media">
    <p>Some friends and I have been working recently on how to apply computational
    techniques such as machine learning and genetic programming to quantitative
    finance. One of the first problems one has in this area is
    how to predict growth. It turns out that it isn't at all easy to make
    predictions that are better out of sample than always predicting average
    growth. After experimenting with a wide variety of metrics commonly used
    in quantitative finance, we have now developed an algorithm that yields
    statistically sound predictions. While I can't share the details
    of the algorithm, I can describe its context, share some visualizations 
    and discuss some of our technology choices.</p>

    <h3>Context and problem space</h3>

    <p>Our goal is to develop an automated investment strategy that can perform
    demonstrably better than investing in an index such as the S&P 500. "Better"
    here means higher growth with lower risk. We can leave the definition at that
    for now (<a target="_blank" href="https://en.wikipedia.org/wiki/Sharpe_ratio">Sharpe ratio</a> 
    is one way to quantify this fitness measure), because so far we have been 
    working primarily on how to predict growth. I won't be discussing here
    any of the well-known methods that work well for calculating volatility or risk.
    </p>

    <p>I recently watched an online video, which I won't link or name,
    that claimed to have found a hidden technique for predicting with 100%
    accuracy entry points for buying stocks low and exit points for 
    selling high. While I knew right away that the "100%" claim
    was inaccurate, the author's idea sounded pretty plausible,
    so I followed along until I knew exactly how to calculate the necessary
    metrics and determine entry and exit points. When I looked at the charts, it also
    seemed like more often than not, the sell points were higher than
    the buy points. So, I backtested it on a small but
    random selection of stocks from the S&P over a 20 year period.
    The buying and selling specified
    by the algorithm did turn a profit, but one would
    have made more money by just investing an equal share in each
    of the randomly selected stocks and selling at the end of the trial.
    In other words, buy and hold was superior to the algorithm.</p>

    <p>I tell this story mainly to emphasize how hard it is to beat
    investing in an index. Sure, you can look at some charts, find <em>in hindsight</em>
    the best buy and sell points, and then talk yourself into thinking
    there is a pattern that could have been spotted in advance.
    But if you try to quantify and backtest
    such patterns <em>out of sample</em>, i.e., on data you haven't look at yet,
    you'll find that most of them don't hold up. They'll probably make
    some money because the market as a whole has advanced,
    so even randomly selecting when to buy and sell  would more often than not turn a profit.
    But in most cases, your algorithm will translate into a strategy
    that is inferior to buy and holding the index, because
    when you sell at some suboptimal exit points, you miss out on market upturns
    where the buy-and-hold strategist made profits that you missed.</p>

    <p>Survivor bias. Baseline measure. Standard error. Training and test data.</p>

    <h3>Visualizations</h3>

    <h3>Technology choices</h3>
</div>
