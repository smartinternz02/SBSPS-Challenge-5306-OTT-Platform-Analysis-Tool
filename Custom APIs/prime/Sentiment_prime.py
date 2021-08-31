# Importing Libraries 

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import string
import re
import nltk
import os
import numpy as np
import pandas as pd
import tweepy
import sys

from nltk.corpus import stopwords


def final():
    '''
    This final function is called in the flask app to process the Real-time tweet requests from Twitter API.
    '''
    stoplist = set(stopwords.words("english"))
    '''
    Twitter Developer Credentials can be added below
    '''
    consumer_key = ""
    consumer_secret = ""
    access_token = ""
    access_token_secret = ""

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    analyser = SentimentIntensityAnalyzer()


# Percentage Function to be used later for % of sentiments 

    def percentage(part, whole):
        return 100 * float(part)/float(whole)

# Targeted filtering on tweets using Keywords 

    keyword = "primevideo"
    num_tweet = 100
    last_id = None
    '''
    Real-time extraction of tweets based on above keywords  
    '''
    tweets = tweepy.Cursor(api.search,  q=keyword, lang='en', max_id=last_id,
                        tweets_mode="extended").items(num_tweet)
    '''
    Creating a Dataframe of extracted tweets
    '''

    tweet_db=[]
    for tweet in tweets:
        tweet_db.append(tweet.text)

    tweet_db = pd.DataFrame(tweet_db)

    '''
    Dropping duplicate tweets
    '''
    tweet_db.drop_duplicates(inplace=True)

    tweets = pd.DataFrame(tweet_db)
    tweets["text"] = tweets[0]

    '''
    Preprocessing functions - Cleaning tweets and removing irrelevant information 
    '''
    def remove_rt(x): return re.sub('RT @\w+: ', " ", x)
    def rt(x): return re.sub(
        "(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", x)


    tweets["text"] = tweets.text.map(remove_rt).map(rt)
    tweets["text"] = tweets.text.str.lower()

    for index, row in tweets['text'].iteritems():

        '''
        VADER based Sentiment Analysis on the dataframe of tweets
        '''
        score = analyser.polarity_scores(row)
        neg = score['neg']
        neu = score['neu']
        pos = score['pos']

        if neg > pos:
            tweets.loc[index, 'sentiment'] = "negative"
        elif pos > neg:
            tweets.loc[index, 'sentiment'] = "positive"
        else:
            tweets.loc[index, 'sentiment'] = "neutral"

        tweets.loc[index, 'neg'] = neg
        tweets.loc[index, 'neu'] = neu
        tweets.loc[index, 'pos'] = pos

    '''
    Classifying sentiments into positive, negative and neutral
    '''
    tweets_negative = tweets[tweets["sentiment"] == "negative"]
    tweets_positive = tweets[tweets["sentiment"] == "positive"]
    tweets_neutral = tweets[tweets["sentiment"] == "neutral"]

# count_words: Function that outputs Total tweets and % of 3 kinds of sentiment

    def count_words(data, feature):
        total = data.loc[:, feature].value_counts(dropna=False)
        percentage = round(data.loc[:, feature].value_counts(
            dropna=False, normalize=True)*100, 2)
        count_df = []
        count_df = pd.concat([total, percentage], axis=1,
                            keys=['Total', 'Percentage'])
        return count_df


    count_df = count_words(tweets, "sentiment")
    return (count_df.to_dict())
    '''
    Printing the final output of Sentiment Analysis 
    '''

    count_df = count_words(tweets, "sentiment")
    print(count_df.to_dict())
