<?php

namespace App\Http\Controllers;

use App\Models\ContactCategory;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle the contact form submission.
     */
    public function handleContactForm(Request $request)
    {
        try {
            // Log incoming request
            \Log::info('Incoming Request:', $request->all());
    
            // Validate the form inputs
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'subject' => 'required|string|max:255',
                'category' => 'required|exists:contact_categories,id',
                'message' => 'required|string|min:10',
            ]);
    
            // Log validation success
            \Log::info('Validation passed');
    
            // Save the inquiry to the database
            ContactInquiry::create([
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
                'contact_category_id' => $request->category,
            ]);
    
            // Log database success
            \Log::info('Data saved successfully');
    
            return response()->json(['message' => 'Your message has been sent successfully!'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors and return them as JSON
            return response()->json([
                'error' => 'Validation error',
                'details' => $e->errors() // Detailed validation errors
            ], 422);
        } catch (\Exception $e) {
            // Log the error for further debugging
            \Log::error('Error processing contact form:', [
                'error_message' => $e->getMessage(),
                'stack_trace' => $e->getTraceAsString()
            ]);
    
            // Return a generic error response to the frontend
            return response()->json([
                'error' => 'Server error',
                'message' => 'An error occurred on the server. Please try again later.'
            ], 500);
        }
    }
    
    
    
    /**
     * Return the list of categories for the contact form.
     */
    public function getCategories()
    {
        return ContactCategory::all();
    }
}
