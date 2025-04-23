import tensorflow as tf
from tensorflow.keras.layers import Embedding, LSTM, Dense, Input, Concatenate
from tensorflow.keras.models import Model
from tensorflow.keras.layers import AdditiveAttention

# Hyperparameters
vocab_size = 10000  # Example vocabulary size
embedding_dim = 256  # Size of word embeddings
hidden_size = 512  # Number of LSTM units

# Encoder
input_seq = Input(shape=(None,), name="Input_Sequence")
embedding = Embedding(input_dim=vocab_size, output_dim=embedding_dim, name="Encoder_Embedding")(input_seq)
encoder_lstm = LSTM(units=hidden_size, return_sequences=True, return_state=True, name="Encoder_LSTM")
encoder_output, state_h, state_c = encoder_lstm(embedding)

# Decoder
decoder_input = Input(shape=(None,), name="Decoder_Input")
decoder_embedding = Embedding(input_dim=vocab_size, output_dim=embedding_dim, name="Decoder_Embedding")(decoder_input)
decoder_lstm = LSTM(units=hidden_size, return_sequences=True, return_state=True, name="Decoder_LSTM")
decoder_output, _, _ = decoder_lstm(decoder_embedding, initial_state=[state_h, state_c])

# Attention
attention = AdditiveAttention(name="Attention_Layer")
context_vector = attention([decoder_output, encoder_output])

# Concatenate context vector with decoder output
concat_layer = Concatenate(axis=-1, name="Concat_Layer")([context_vector, decoder_output])

# Dense Layer for Output
output = Dense(units=vocab_size, activation="softmax", name="Output_Layer")(concat_layer)

# Model Definition
model = Model([input_seq, decoder_input], output)
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Model Summary
model.summary()
