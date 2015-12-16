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
    of our algorithms, I can describe what we're doing in general terms, discuss
    some of our technology choices and share some visualizations 
    of the results.</p>

    <p>The following chart, for example, shows actual adjusted price (blue) compared to predicted 
    growth (red) for <em>GE</em> over the last 20 years. 
    <img src="images/ge_growth.png" class="img-responsive">
    <em>Adjusted</em> price is provided by <a href="http://finance.yahoo.com" 
    target="_blank">Yahoo! Finance</a> with adjustments
    for splits and dividends. Predicted growth is calculated using our machine
    learning model and is of
    course derived only from data available at the time of the prediction.
    The grey line right around 1.2 in the lower chart represents average growth.
    So, the model is predicting above average growth whenever the red line
    is above the grey line and below average growth when the red line drops
    below the grey.</p>

    <p>Note that while the model accurately identifies the crash
    of 2009 as a great time to buy, it would have been difficult
    in real time to recognize the exact best spot even with knowledge 
    only of predictions up to the current time. For example, toward the
    end of 2008, predicted growth spikes first to around 1.6, which translates
    to a predicted 60% return on investment over the prediction period.
    <em>In real time</em>, with knowledge only of events and metrics
    up to that point, that would seem like a great spot to buy, and
    it would indeed have been a fairly good one. If you waited
    a little longer, however, until the stock went down another 50% to around $5 in early 2009,
    you would have done significantly better. So, while our crystal ball does 
    provide some very useful information, it is not obvious how best to make
    use of the predictions <em>in real time</em> in an optimized investment strategy.
    Nor will I be discussing here how one might devise such a strategy. Here,
    I'll only be interested in making good predictions and will take it for
    granted that better predictions can be used for improving expected
    profitability. I do want to point out that even given
    relatively accurate albeit fallible predictions, it is by no means
    obvious how to create an investment strategy that is optimal
    in the sense of maximizing growth while minimizing risk.<p>

    <p>Since this is the first publication of results on a project we've
    been working on for a while now, let me back up and provide some context
    on our project and what some of the considerations are that go into
    the prediction component before discussing our technology choices
    and initial results.</p>

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

    <h3>Making accurate predictions</h3>
    <p>Stock price behavior is influenced by many unpredictable factors and
    thus includes an enormous amount of noise. Because we can never predict prices
    exactly, we need a measure by which to judge which of several inexact
    predictions is the most accurate. <a href="https://en.wikipedia.org/wiki/Standard_error"
    target="_blank">Standard error</a> is the measure we are looking for to
    quantify predictive accuracy.</p>
    <p>The <em>standard error</em> of an estimate or prediction is the statistical
    counterpart to <em>standard deviation</em>. Information on how to calculate it
    is readily available and is outside the scope of this article. Its significance
    can best be explained by example: If we say that our predictions have a standard
    error of <code>0.5</code> relative to known actual values, that means that about 
    <code>2/3</code> of our estimates will be within <code>0.5</code> of the actual value.</p>
    
    <p>The success of a machine learning algorithm is measured by low standard error <em>out
    of sample</em>, that is on test data not visited by the algorithm while it was
    learning the model. Machine learning algorithms are designed to minimize
    error <em>in sample</em>, on the data set from which the model is developed.
    So, they will invariably do well in sample but will not necessarily be
    useful out of sample. What that means in our context is that we might 
    develop a model from the last 10 years of data on some random selection
    of stocks that makes very accurate predictions on the stocks used for learning.
    But we could find that its predictions are not so accurate out of sample,
    on stocks that were not used when the model was learned.</p>

    <p>Our baseline for predicting growth was simply to use the mean, which can
    be shown to be the constant model with the greatest accuracy. In other words,
    our baseline was to take a random selection of equities and simply calculate 
    their average growth over a given forecast interval. The standard error
    of that prediction is then the value that needs to be beaten <em>out of sample</em>.
    Given the noisy data, this task isn't particularly easy. Note also that
    the baseline prediction can only translate into an investment strategy of 
    <em>buy and hold</em>, as it is just using current price as the predictor
    of future price. As is well known among specialists in quantitative finance, buy
    and hold is not easy to beat.</p>

    <p>baseline measure, standard error, out-of-sample, survivor bias</p>
    
    <img src="images/tsla_growth.png" class="img-responsive">
    <img src="images/ge_growth_detail.png" class="img-responsive">

    <h3>Technology choices</h3>
    <p>Those more interested in the results than the technologies can
    safely skip this section.</p>
    <p>Python, Mongo, pynance, pandas, numpy, matplotlib</p>
    <h3>Initial results</h3>
</div>
