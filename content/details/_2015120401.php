<div class="page-header">
    <h2>Machine learning for predicting stock growth
    <small><?php echo handle_to_date($_GET['id']); ?></small></h2>
</div>
<div class="media">
    <p>Some co-conspirators and I have been working recently on how to apply computational
    techniques such as machine learning and genetic programming to quantitative
    finance. One of the first problems one has in this area is
    how to predict growth. It turns out that it isn't at all easy to make
    predictions that are better out of sample than always predicting average
    growth. After experimenting with a wide variety of metrics commonly used
    in quantitative finance, we have now developed an algorithm that yields
    statistically sound predictions. While I can't share the details
    of our algorithms, I can describe in general terms what we're doing, share some visualizations 
    of our results and discuss some of our technology choices.</p>

    <p>The following chart shows actual adjusted price (blue) compared to predicted 
    growth (red) for <em>GE</em> over the last 20 years. 
    <img src="images/ge_growth.png" class="img-responsive">
    <em>Adjusted</em> price is provided by <a href="http://finance.yahoo.com" 
    target="_blank">Yahoo! Finance</a> with adjustments
    for splits and dividends. Predicted growth is calculated using our machine
    learning model and is of
    course derived only from data available at the time of the prediction.
    The grey line right around 1.2 in the lower chart represents average growth.
    So, the algorithm is predicting above average growth whenever the red line
    is above the grey line and below average growth when the red line drops
    below the grey.</p>

    <p>Note that while the algorithm accurately identifies the crash
    of 2009 as a great time to buy, it would have been difficult
    in real time to recognize the exact best spot. For example, toward the
    end of 2008, predicted growth spikes briefly to 1.6, which translates
    to a predicted 60% return on investment over the prediction period.
    <em>In real time</em>, with knowledge only of events and metrics
    up to that point, that would seem like a great spot to buy, and
    it would indeed have been a good one. If you waited
    a little longer, however, until the stock went down another 50% to around $5 in early 2009,
    you would have done even better. So, while our crystal ball does 
    provide some very useful information in this case, it is not obvious how best to make
    use of these predictions <em>in real time</em> in an optimized investment strategy.<p>

    <p>Since this is the first publication of results on a project we've
    been working on for a fair while now, let me back up and provide some context,
    then, on our project and what some of the considerations are that go into
    just the prediction component of our project.</p>

    <h3>Background</h3>

    <p>Our goal is to develop an automated investment strategy that can perform
    demonstrably better than investing in an index such as the S&P 500. "Better"
    here means higher growth with lower risk. We can leave the definition at that
    for now (<a target="_blank" href="https://en.wikipedia.org/wiki/Sharpe_ratio">Sharpe ratio</a> 
    is one way to quantify this fitness measure), because so far we have been 
    working primarily on how to predict growth. I won't be discussing here
    any of the well-known methods that work well for calculating volatility or risk.
    </p>

    <p>I recently watched an online video 
    that claimed to have found a hidden technique for predicting with 100%
    accuracy entry points for buying stocks low and exit points for 
    selling high. While I knew right away that the "100%" claim
    was inaccurate, the author's idea sounded pretty plausible,
    so I wrote the code to calculate and chart the metrics
    for determining entry and exit points according to this algorithm.
    And on the charts, it did
    seem like more often than not, the sell points were higher than
    the buy points. So, I backtested it on a small but
    random selection of stocks from the S&P over a 20 year period.
    The algorithm did turn a profit, but one would
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
    but few algorithms can consistently beat buy and hold.
    When you sell at suboptimal exit points, as you sometimes will, you miss out on market upturns
    where the buy-and-hold strategist still makes a profit.</p>

    <h3>Measuring predictive accuracy</h3>
    <p>baseline measure, standard error</p>
    <h3>Testing on independent data</h3>
    <p>Survivor bias</p>
    
    <img src="images/tsla_growth.png" class="img-responsive">
    <img src="images/ge_growth_detail.png" class="img-responsive">

    <h3>Technology choices</h3>
    <p>Python, Mongo, pynance, pandas, numpy, matplotlib</p>
    <h3>Initial results</h3>
</div>
