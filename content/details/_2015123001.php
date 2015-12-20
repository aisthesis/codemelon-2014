<div class="page-header">
    <h2>Machine learning for predicting stock growth
    <small><?php echo handle_to_date($_GET['id']); ?></small></h2>
</div>
<div class="media">
    <p>Some co-conspirators and I have been working recently on how to apply computational
    techniques such as machine learning and genetic programming to quantitative
    finance. One of the first problems one has here is
    how to predict growth. It turns out that it isn't easy to make
    predictions that are better out of sample than always predicting <em>average</em>
    growth. After experimenting with numerous metrics commonly used
    in quantitative finance, we have developed an algorithm that yields
    statistically sound predictions. While I can't share the details
    of our methodology, I shall discuss here the problem it addresses
    and some of our initial results.</p>

    <p>The following chart shows actual adjusted price (blue) compared to predicted 
    growth (red) for <em>GE</em> over the last 20 years. 
    <img src="images/ge_growth.png" class="img-responsive">
    <em>Adjusted</em> price is provided by <a href="http://finance.yahoo.com" 
    target="_blank">Yahoo! Finance</a> with adjustments
    for splits and dividends. Predicted growth is calculated using our machine
    learning model and is derived only from data available at the time of the prediction.
    The grey horizontal line at about <code>1.2</code> in the lower chart represents <em>average</em> growth.
    So, the model is predicting above average growth whenever the red line
    is above the grey line and below average growth when the red line drops
    below the grey.</p>

    <p>Note that while the model accurately identifies the crash
    of 2009 as a great time to buy, it would have been difficult
    in real time to recognize the exact best spot even with knowledge 
    only of predictions up to the current time. For example, toward the
    end of 2008, predicted growth spikes first to around <code>1.6</code>, which translates
    to a predicted 60% return on investment over the prediction period.
    <em>In real time</em>, with knowledge only of events and metrics
    up to that point, that would already seem like a great spot to buy, and
    it would indeed have been a pretty good one. If you waited
    a little longer, however, until the stock went down another 50% to around $5 in early 2009,
    you would have done significantly better. So, while our crystal ball clearly
    provides useful information, it is not obvious how best to make
    use of the predictions <em>in real time</em> in an optimized investment strategy.
    Nor will I be discussing here how one might devise such a strategy. Here,
    I'll only be interested in how to make accurate predictions and will take it for
    granted that such predictions can be used for improving expected
    profitability. I do want to emphasize that even given
    relatively accurate, albeit fallible, predictions, it is still
    not clear how to create an investment strategy that is optimal
    in the sense of maximizing growth while minimizing risk.<p>

    <p>In order to understand what this chart <em>does</em> tell us,
    let's look at the context of the problem we're attempting to solve and
    the metrics by which to evaluate "better" or "worse" solutions. We can then
    better understand what such charts tell us
    as well as their limitations.</p>

    <h3>Context and problem</h3>

    <p>Our goal is to develop an automated investment strategy that can perform
    demonstrably better than investing in an index such as the S&P 500. "Better"
    here means higher growth with lower risk. We can leave the definition at that
    for now (<a target="_blank" href="https://en.wikipedia.org/wiki/Sharpe_ratio">Sharpe ratio</a> 
    is one way to quantify this fitness measure), because so far our team has been 
    working primarily on how to predict growth. So, I won't be discussing here
    any of the well-known methods that work well for calculating volatility or risk.</p>

    <p>I recently watched an online video that claimed to solve the same problem
    we are addressing. Its author 
    claimed to have found a hidden technique for predicting <em>with 100%
    accuracy</em> entry points for buying stocks low and exit points for 
    selling high. While I knew right away that the "100%" claim
    couldn't be inaccurate, the author's idea sounded plausible,
    so I wrote the code to calculate and chart the 
    entry and exit points according to this algorithm.
    And on the charts, it did
    seem like more often than not, the sell points were higher than
    the buy points. So, I backtested it on a small but
    random selection of stocks from the S&P over a 20 year period.
    And, while the algorithm generated a profit on a statistically relevant set of data, one would
    have in fact made <em>more</em> money by just investing an equal share in each
    of the randomly selected stocks and selling at the end of the trial.
    In other words, buy and hold was superior to the algorithm.</p>

    <p>I tell this story mainly to emphasize how hard it is to beat
    investing in an index. Sure, you can look at some charts, find <em>in hindsight</em>
    the best buy and sell points, and then talk yourself into thinking
    there is a pattern that could have been spotted in advance.
    But if you try to quantify and backtest
    such patterns <em>out of sample</em>, i.e., on data you haven't looked at yet,
    you'll find that most of them don't hold up. They'll probably make
    some money because the market as a whole has advanced,
    but few algorithms can consistently beat buy and hold.
    When you sell at suboptimal exit points, as you sometimes will, you miss out on market upturns
    where the buy-and-hold strategist still makes a profit.</p>

    <p>Our goal is to develop an algorithmic investment system
    that performs demonstrably better than buy and hold. One component of this
    system is making accurate growth predictions. It is this component that we are currently
    working on and that the above chart illustrates. Our system is designed
    to look for patterns over periods of several months and not for intraday patterns useful for day
    trading. Most investors, including us, don't have the resources (such as fast fiber-optic
    feeds in close proximity to the exchanges) to compete
    with brokerages that receive market data within nanoseconds of its availability, so we have
    focussed on medium- to long-term patterns where it doesn't matter so much if your
    data feed is seconds or minutes behind the market. We're concerned with predicting
    how well a stock is likely to perform over the next few months. Let's look now
    at how to get a valid metric for this task.</p>

    <h3>Making accurate predictions</h3>
    <p>Stock prices are influenced by many unpredictable factors and
    are thus subject to significant fluctuations due to noise. 
    Because we can never predict future prices
    exactly, we need a measure by which to judge which of several inexact
    predictions is the most accurate. <a href="https://en.wikipedia.org/wiki/Standard_error"
    target="_blank">Standard error</a> is the measure we are looking for to
    quantify predictive accuracy.</p>
    <p>The <em>standard error</em> of an estimate or prediction is the statistical
    counterpart to <em>standard deviation</em>. Information on how to calculate it
    is readily available, so I won't go into that here. What standard error means, though,
    can be explained by a simple example: If we say that our predictions have a standard
    error of <code>0.5</code> relative to known actual values, that means that about 
    <code>2/3</code> of our estimates will be within <code>0.5</code> of the actual value.</p>
    
    <p>The success of a machine learning algorithm is measured, then, by low standard error <em>out
    of sample</em>--i.e., on test data not visited by the algorithm while it was
    learning the model. Machine learning algorithms are <em>designed</em> to minimize
    error <em>in sample</em>, on the data from which the model is developed.
    So, they will invariably do well in sample but will not necessarily be
    useful out of sample. What that means in our context is that we might 
    develop a model from past data on some random selection
    of stocks that makes very accurate predictions on <em>those</em> stocks for <em>that</em> time period.
    But its predictions may not be accurate out of sample,
    on stocks that were not used when developing the model.</p>

    <p>Our baseline for predicting growth was the mean, which can
    be shown to be the constant model with the greatest accuracy. In other words,
    our baseline was to take a random selection of equities and simply calculate 
    their average growth over a given forecast interval. The standard error
    of this constant prediction is then the value that needs to be beaten <em>out of sample</em>.
    Given the noisy fluctuations, this isn't easy to do. As the basis for an investment strategy, 
    this baseline prediction will invariably lead to  
    <em>buy and hold</em>. The baseline prediction is in fact impossible to beat if
    it is true that current price alone is the best predictor of future price.
    As is well known among specialists in quantitative finance, buy
    and hold is hard to beat. Many experts believe that 
    efficient markets price in all available information. If their hypothesis 
    holds, current price 
    <em>is</em> in fact the best predictor of future price, and buy-and-hold is the best
    investment strategy.</p>
    <p>We have experimented with numerous technical
    indicators to determine which, if any, could lead to models consistently showing lower out-of-sample
    error than the baseline prediction, and we have arrived at features that
    have shown modest but consistent improvements relative to 
    the baseline. While I can't share what these features are, I can present
    some charts illustrating what the algorithm predicts in a few sample cases.</p>
    
    <h3>Initial results</h3>
    <p>Let's first look at a detail of the most interesting time frame from the GE chart
    shown above:</p>
    <img src="images/ge_growth_detail.png" class="img-responsive">
    <p>While it may be difficult or impossible in real time to deduce from the predictions an optimal buy point,
    there is a clear spike in predicted growth which peaks at what is clearly
    the best time to <em>buy</em>. The predictions do not, however, provide comparable clarity
    on when to <em>sell</em>. When the stock is in reality about to drop from a peak of over 30
    the growth prediction is weak but still positive, somewhere around <code>1.1</code>.
    The algorithm expects the stock to do worse than the baseline at this point in time, but it
    is wrongly still predicting positive growth. According to the predictions,
    the stock's value would increase by 10% from, let's say, 30 to 33. Instead
    it drops from 30 to a low around 5. The predictions still beat the baseline,
    which constantly predicts a 20% increase in price, but the model
    doesn't seem willing to go out on a limb in predicting a catastrophic decline.</p>
    <p>When using these predictions in an investment strategy, one important
    question will be whether those stocks showing the highest predicted growth in
    bear markets are in fact fairly resistent to decline or are even among the few stocks that
    actually show a gain during a financial crisis. In that case, even fairly
    simple strategies built on the predictions should do quite well.
    This is the kind of question we're still researching, so for now, I don't
    yet have an answer.</p>

    <p>The chart of TSLA shows that the model doesn't predict explosive growth only
    after a sharp decline but also after a flat period. The model isn't catching <em>only</em>
    the patterns typical of stocks bottoming out as they did in early 2009:</p>
    <img src="images/tsla_growth.png" class="img-responsive">
    <p>Here, too, we see a spike in predicted growth at what would have been
    an excellent time to buy Tesla Motors, namely in May of 2013. Aside from the
    difficulty of taking action in real time, <em>without the knowledge of whether predicted
    growth might go higher still</em>, if we had invested in May 2013 when the stock was below
    100 and then sold in October when predicted growth falls back to the baseline, we would
    have had a return on investment of around 100% over a period of only 5 months!</p>
    <p>An interesting feature of this chart is that predicted growth actually <em>does</em>
    show a well-defined valley from December 2013 until roughly March 2014. The negative
    growth prediction does not, however, reflect what actually happens. In reality, TSLA
    still has a good deal of growth left and, while its price fluctuates quite a bit
    in the ensuing time period, it almost always stays above 200. So, the sell point
    indicated by the model is certainly sub-optimal.</p>

    <h3>Summary</h3>
    <p>Let me start with what our model <em>does not</em> do: It doesn't
    predict bull and bear cycles with anything approaching 100% accuracy. It is
    a model based on statistics and designed to yield the lowest possible standard
    error based on metrics known in real time. It can't predict fluctuations due
    to noise, which is just the aggregate of causally relevant events that could not be foreseen
    at the time. We required
    numerous attempts, trying many different metrics, to arrive at a model
    yielding predictions more accurate out of sample than the baseline of average
    growth. The charts shown here reflect the output of that model and suggest
    that these growth predictions can provide very useful input for investment strategies capable of
    outperforming buy and hold.</p>

</div>
