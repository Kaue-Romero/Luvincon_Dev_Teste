<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Http;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cardNumber' => 'required|string|regex:/^\d{4} \d{4} \d{4} \d{4}$/',
            'cardName' => 'required|string',
            'cardExpiry' => 'required|string',
            'cardCvv' => 'required|numeric',
            'cep' => ['required', 'string', $this->validCep()],
            'street' => 'required|string',
            'number' => 'numeric',
            'neighborhood' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'items.*.product_id' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
        ];
    }

    private function validCep(): \Closure
    {
        return function ($attribute, $value, $fail) {
            try {
                $value = preg_replace('/\D/', '', $value);
                $response = Http::get("https://viacep.com.br/ws/{$value}/json/");
                if ($response->failed() || $response->json('erro') === "true") {
                    $fail('O CEP informado não é válido.');
                }
            } catch (\Exception $e) {
                $fail('Erro ao validar o CEP. Tente novamente.');
            }
        };
    }
}
