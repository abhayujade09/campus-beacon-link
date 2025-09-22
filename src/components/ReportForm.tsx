import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, MapPin, Calendar, Clock, User } from 'lucide-react';

interface ReportFormProps {
  onSubmit?: (data: any) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    status: 'lost',
    description: '',
    location: '',
    date: '',
    time: '',
    contactInfo: '',
    image: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    'Electronics',
    'Books',
    'Clothing',
    'Accessories',
    'Keys',
    'Bags',
    'Sports Equipment',
    'Other'
  ];

  const commonLocations = [
    'Library',
    'Student Center',
    'Cafeteria',
    'Gymnasium',
    'Computer Lab',
    'Engineering Building',
    'Science Building',
    'Dormitory',
    'Parking Lot',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Item Reported Successfully!",
        description: `Your ${formData.status} item has been added to the system.`,
      });

      // Reset form
      setFormData({
        itemName: '',
        category: '',
        status: 'lost',
        description: '',
        location: '',
        date: '',
        time: '',
        contactInfo: '',
        image: null
      });
      setImagePreview(null);

      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-4xl font-bold text-gradient mb-4">Report Item</h2>
          <p className="text-muted-foreground text-lg">
            Help us reunite lost items with their owners or claim found items
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Status Selection */}
            <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold mb-4">What happened?</h3>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.status === 'lost' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, status: 'lost' }))}
                  className="flex-1"
                >
                  <span className="mr-2">😢</span>
                  I Lost Something
                </Button>
                <Button
                  type="button"
                  variant={formData.status === 'found' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, status: 'found' }))}
                  className="flex-1"
                >
                  <span className="mr-2">🎉</span>
                  I Found Something
                </Button>
              </div>
            </Card>

            {/* Item Details */}
            <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-6">Item Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Item Name *</label>
                  <Input
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="e.g., MacBook Pro, Blue Backpack"
                    required
                    className="bg-card/50 border-card-border"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-card/50 border border-card-border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed description including color, brand, distinguishing features..."
                    required
                    rows={4}
                    className="bg-card/50 border-card-border"
                  />
                </div>
              </div>
            </Card>

            {/* Location & Time */}
            <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                When & Where?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-card/50 border border-card-border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Location</option>
                    {commonLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-card/50 border-card-border"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">Approximate Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="pl-10 bg-card/50 border-card-border"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Image Upload */}
            <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Add Photo
              </h3>
              
              <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-xs max-h-48 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload a clear photo of the item (optional but recommended)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button type="button" variant="outline" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Contact Information
              </h3>
              
              <Input
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="Email or phone number for contact"
                required
                className="bg-card/50 border-card-border"
              />
              <p className="text-xs text-muted-foreground mt-2">
                This will be used to contact you when there's a match or update
              </p>
            </Card>

            {/* Submit */}
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Button
                type="submit"
                variant="cosmic"
                size="xl"
                disabled={isSubmitting}
                className="min-w-48"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  `Report ${formData.status.charAt(0).toUpperCase() + formData.status.slice(1)} Item`
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};