package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"
)

// Clave pública de cifrado (debe ser de 32 bytes para AES-256)
const PublicKey = "LuisaOcampoIFXpruebatecnica20250"

// Encrypt cifra un texto usando AES-256 en modo CBC
func Encrypt(plainText string) (string, error) {
	// Verificar que la clave sea válida
	if len(PublicKey) < 32 {
		return "", errors.New("clave de cifrado inválida, debe tener al menos 32 caracteres")
	}

	key := []byte(PublicKey)[:32] // Asegurar 32 bytes
	iv := []byte(PublicKey[:16])  // Vector de inicialización (16 bytes)

	// Crear el bloque de cifrado
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// Aplicar padding PKCS7
	plainTextBytes := []byte(plainText)
	padding := aes.BlockSize - len(plainTextBytes)%aes.BlockSize
	paddedText := append(plainTextBytes, bytes.Repeat([]byte{byte(padding)}, padding)...)

	// Cifrar en modo CBC
	cipherText := make([]byte, len(paddedText))
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(cipherText, paddedText)

	// Convertir a Base64
	return base64.StdEncoding.EncodeToString(cipherText), nil
}

func Decrypt(encryptedText string, apiKeys ...string) (string, error) {
	apiKey := PublicKey

	if len(apiKeys) > 0 && apiKeys[0] != "" {
		apiKey = apiKeys[0]
	}

	cipherText, err := base64.StdEncoding.DecodeString(encryptedText)
	if err != nil {
		return "", err
	}

	iv := []byte(apiKey[:16])

	block, err := aes.NewCipher([]byte(apiKey))
	if err != nil {
		return "", err
	}

	if len(cipherText) < aes.BlockSize {
		return "", errors.New("el texto cifrado es demasiado corto")
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	mode.CryptBlocks(cipherText, cipherText)

	plainText := unpad(cipherText)

	return string(plainText), nil
}

func unpad(data []byte) []byte {
	padding := int(data[len(data)-1])
	return data[:len(data)-padding]
}
