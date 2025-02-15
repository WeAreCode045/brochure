
import { ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PropertyBreadcrumbProps {
  title: string;
  onBack: () => void;
}

export function PropertyBreadcrumb({ title, onBack }: PropertyBreadcrumbProps) {
  return (
    <div className="bg-estate-50 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={onBack} 
              className="flex items-center gap-1 text-estate-600 hover:text-estate-800"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Properties
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
