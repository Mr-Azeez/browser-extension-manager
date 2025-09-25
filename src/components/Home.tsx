import { Card, CardDescription, CardFooter } from "./ui/card";
import { Switch } from "./ui/switch";
import { data } from "@/data";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ConfirmationModal from "./COnfirmationModal";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


interface Extension {
  id?: number | undefined;
  name?: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
}

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [extentionList, setExtensionList] = useState(data);
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(
    null
  );

  const filteredData = extentionList.filter((item) => {
    if (filter === "active") {
      return item.isActive;
    }
    if (filter === "inactive") {
      return !item.isActive;
    }
    return true;
  });

  const handleToggle = (id: number, checked: boolean) => {
    setSelectedExtension(selectedExtension);
    setExtensionList((prev) =>
      prev.map((ext) => (ext.id === id ? { ...ext, isActive: checked } : ext))
    );
  };

  const handleDelete = (id: number) => {
    setExtensionList((prev) => prev.filter((ext) => ext.id !== id));
  };

  return (
    <section id="home">
      <div className="flex items-center md:justify-between flex-col md:flex-row gap-2 mx-auto py-4">
        <div>
          <h2 className="text-foreground font-bold text-3xl mb-4">
            Extension List
          </h2>
        </div>
        <div>
          <Button
            variant="outline"
            className={cn(
              "rounded-full mx-2 bg-[#fff] hover:text-[#545969] cursor-pointer focus:ring-2 ring-[#c7221a] focus:ring-offset-1",
              {
                "bg-[#c7221a] text-[#fff] hover:bg-[#f25c54] hover:text-[#fff] dark:hover:bg-[#f25c54] dark:bg-[#c7221a]":
                  filter === "all",
              }
            )}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant="outline"
            className={cn(
              "rounded-full mx-2 bg-[#fff] hover:text-[#545969] cursor-pointer focus:ring-2 ring-[#c7221a] focus:ring-offset-1",
              {
                "bg-[#c7221a] text-[#fff] hover:bg-[#f25c54] hover:text-[#fff] dark:hover:bg-[#f25c54] dark:bg-[#c7221a]":
                  filter === "active",
              }
            )}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant="outline"
            className={cn(
              "rounded-full mx-2 bg-[#fff] hover:text-[#545969] cursor-pointer ring-0 focus:ring-2 ring-[#c7221a] focus:ring-offset-1",
              {
                "bg-[#c7221a] hover:bg-[#f25c54] hover:text-[#fff] dark:hover:bg-[#f25c54] dark:bg-[#c7221a]":
                  filter === "inactive",
              }
            )}
            onClick={() => setFilter("inactive")}
          >
            InActive
          </Button>
        </div>
      </div>
      {filteredData.length === 0 && filter && (
        <p className="text-foreground">No extension left in "{filter}" tab</p>
      )}
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-10 px-2 md:px-0 mx-auto"
      >
        {filteredData.map((extension) => (
          <Card
            key={extension.id}
            className="grid grid-row-2 items-center overflow-x-auto transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="grid grid-cols-3 px-4">
              <div>
                <img
                  src={extension.logo}
                  alt={`${extension.name} icon`}
                  className="size-[70px]"
                />
              </div>
              <div className="col-span-2">
                <h2 className="font-bold text-2xl text-left">
                  {extension.name}
                </h2>
                <CardDescription className="text-left">
                  {extension.description}
                </CardDescription>
              </div>
            </div>

            <CardFooter className="px-4">
              <div className="flex justify-between items-center w-full">
                <Button
                  variant="outline"
                  onClick={() => setSelectedExtension(extension)}
                  className="rounded-full text-foreground cursor-pointer bg-[#fff] hover:bg-[#c7221a] dark:hover:bg-[#c7221a] hover:text-[#fff] dark:hover:text-[#09153e] focus:ring-2 ring-[#c7221a]"
                >
                  Remove
                </Button>
                <Switch
                  checked={extension.isActive}
                  onCheckedChange={(checked) =>
                    handleToggle(extension.id, checked)
                  }
                  className="transition-colors duration-300 ease-in-out cursor-pointer focus:ring-2 ring-[#c7221a] ring-offset-1"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
      <ConfirmationModal
        open={!!selectedExtension}
        onClose={() => setSelectedExtension(null)}
      >
        <AnimatePresence>
          {selectedExtension && (
            <div>
              <FaTrashAlt size={56} className="text-secondary mx-auto mb-4" />

              <p className="text-secondary text-center mb-4 font-bold">
                Are you sure you want to remove "{selectedExtension.name}"
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  selectedExtension.id !== undefined &&
                    handleDelete(selectedExtension.id);
                  setSelectedExtension(null);
                }}
                className="flex justify-center w-full rounded-full text-secondary cursor-pointer bg-[#c7221a] hover:bg-[#f25c54] dark:hover:bg-[#f25c54] hover:text-[#fff] dark:hover:text-[#09153e] dark:bg-[#c7221a] focus:ring-2 ring-[#c7221a]"
              >
                Remove
              </Button>
            </div>
          )}
        </AnimatePresence>
      </ConfirmationModal>
    </section>
  );
};

export default Home;
